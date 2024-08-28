import { zodResolver } from "@hookform/resolvers/zod";
import type { MetaFunction } from "@remix-run/node";
import { loginFieldSchema } from "constants/zodVlidationSchema";
import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { z } from "zod";
import { PrimaryButton } from "~/components/Button/PrimaryButton";
import { InputForm } from "~/components/Form/InputForm";

export const meta: MetaFunction = () => {
  return [
    { title: "signup" },
    { name: "description", content: "You can register as a new user" },
  ];
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof loginFieldSchema>>({
    resolver: zodResolver(loginFieldSchema),
    mode: "onSubmit",
  });

  return (
    <div className="font-sans min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-[365px] shadow-xl p-6 ">
        <div className="card-body">
          <h2 className="card-title">Login form</h2>
        </div>
        <div className="flex flex-col gap-2">
          <InputForm
            name="email"
            control={control}
            defaultValue=""
            iconElement={<MdOutlineEmail />}
            placeholder="Enter your Email"
          />
          <InputForm
            name="password"
            control={control}
            defaultValue=""
            iconElement={<FaKey />}
            placeholder="Enter your password"
          />
          <div className="flex flex-col gap-4 items-center my-6">
            <PrimaryButton buttonText="Login" iconStart={<IoLogInOutline />} />
            <a href="/signup" className="link link-secondary">
              Go to signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
