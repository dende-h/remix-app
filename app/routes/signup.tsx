import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useActionData, useNavigate } from "@remix-run/react";
import { withZod } from "@rvf/zod";
import { signupFieldSchema } from "constants/zodVlidationSchema";
import { apiClient } from "libs/apiClient";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { ValidatedForm } from "remix-validated-form";
import { PrimaryButton } from "~/components/Button/PrimaryButton";
import { InputForm } from "~/components/Form/InputForm";

export const meta: MetaFunction = () => {
  return [
    { title: "signup" },
    { name: "description", content: "You can register as a new user" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const postBody = {
      username: formData.get("userName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await apiClient.post("/register/", postBody);
    return json(
      { user: response.data.user, redirectTo: "/login" },
      { status: response.status }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error during registration:", error);
    let errorMessage = "An unexpected error occurred.";
    let statusCode = 500;
    if (error.response) {
      // サーバーからのレスポンスがある場合
      statusCode = error.response.status;
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      // リクエストは送信されたが、レスポンスが受信されなかった場合
      errorMessage = "No response received from the server.";
    } else {
      // リクエストの設定中に何らかの問題が発生した場合
      errorMessage = error.message;
    }
    return json(
      {
        error: errorMessage,
      },
      { status: statusCode }
    );
  }
}

const validator = withZod(signupFieldSchema);

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  useEffect(() => {
    if (actionData && "redirectTo" in actionData) {
      enqueueSnackbar("Signup successful!", { variant: "success" });
      navigate(actionData.redirectTo);
    }
  }, [actionData, navigate]);

  return (
    <div className="font-sans min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-[365px] shadow-xl p-6 ">
        <div className="card-body">
          <h2 className="card-title items-center">
            Enter your registration information
          </h2>
        </div>
        <ValidatedForm
          method="post"
          validator={validator}
          className="flex flex-col gap-2"
        >
          <InputForm
            name="userName"
            iconElement={<FaUserCircle />}
            placeholder="User Name"
            formType="text"
          />
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
          <InputForm
            name="confirmPassword"
            iconElement={<FaKey />}
            placeholder="confirm password"
            formType="password"
          />
          <div className="flex flex-col gap-4 items-center my-6">
            <PrimaryButton
              buttonText="Signup"
              iconStart={<IoPersonAddSharp />}
              type="submit"
            />
            <a href="/login" className="link link-secondary">
              Go to login
            </a>
          </div>
        </ValidatedForm>
      </div>
    </div>
  );
}
