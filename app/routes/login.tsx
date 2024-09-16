import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  json,
  useActionData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { withZod } from "@rvf/zod";
import { loginFieldSchema } from "constants/zodVlidationSchema";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { FaKey } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { ValidatedForm } from "remix-validated-form";
import { PrimaryButton } from "~/components/Button/PrimaryButton";
import { InputForm } from "~/components/Form/InputForm";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "login" },
    {
      name: "description",
      content: "Log in to the service with your email address and password",
    },
  ];
};

const validator = withZod(loginFieldSchema);

export async function action({ request }: ActionFunctionArgs) {
  try {
    // 認証を試み、成功時にはリダイレクト用のResponseオブジェクトを返す
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/dashboard",
    });
  } catch (error) {
    // 認証が成功してリダイレクトが必要な場合、Responseをそのまま返す
    if (error instanceof Response) {
      return error;
    }
    // 認証に失敗した場合、エラーメッセージを含むJSONレスポンスを返す
    const errorMessage =
      error instanceof Error ? error.message : "Authentication failed.";
    return json({ message: errorMessage }, { status: 401 });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  //認証状態を確認
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}

export default function Login() {
  const data = useActionData<{ message: string }>();
  const [params] = useSearchParams();
  const redirectMessage = params.get("message");
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.message) {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  }, [data, navigate]);
  useEffect(() => {
    if (redirectMessage) {
      enqueueSnackbar(redirectMessage, { variant: "error" });
      navigate("/login", { replace: true });
    }
  }, [navigate, redirectMessage]);
  return (
    <div className="font-sans min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-[365px] shadow-xl p-6 ">
        <div className="card-body">
          <h2 className="card-title">Login form</h2>
        </div>
        <ValidatedForm
          method="post"
          validator={validator}
          className="flex flex-col gap-2"
        >
          <InputForm
            name="email"
            iconElement={<MdOutlineEmail />}
            placeholder="Email"
            formType="email"
          />
          <InputForm
            name="password"
            iconElement={<FaKey />}
            placeholder="e.g., Passw0rd123"
            formType="password"
          />
          <div className="flex flex-col gap-4 items-center my-6">
            <PrimaryButton
              buttonText="Login"
              iconStart={<IoLogInOutline />}
              type="submit"
            />
            <a href="/signup" className="link link-secondary">
              Go to signup
            </a>
          </div>
        </ValidatedForm>
      </div>
    </div>
  );
}
