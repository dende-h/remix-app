import { zodResolver } from "@hookform/resolvers/zod";
import type { MetaFunction } from "@remix-run/node";
import { signupFieldSchema } from "constants/zodVlidationSchema";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
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

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof signupFieldSchema>>({
    resolver: zodResolver(signupFieldSchema),
    mode: "onSubmit",
  });

  return (
    <div className="font-sans min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-[365px] shadow-xl p-6 ">
        <div className="card-body">
          <h2 className="card-title">Enter your registration information</h2>
        </div>
        <div className="flex flex-col gap-2">
          <InputForm
            name="userName"
            control={control}
            defaultValue=""
            iconElement={<FaUserCircle />}
            placeholder="User Name"
          />
          <InputForm
            name="email"
            control={control}
            defaultValue=""
            iconElement={<MdOutlineEmail />}
            placeholder="Email"
          />
          <InputForm
            name="password"
            control={control}
            defaultValue=""
            iconElement={<FaKey />}
            placeholder="e.g., Passw0rd123"
          />
          <InputForm
            name="confirmPassword"
            control={control}
            defaultValue=""
            iconElement={<FaKey />}
            placeholder="confirm password"
          />
          <div className="flex flex-col gap-4 items-center my-6">
            <PrimaryButton
              buttonText="Signup"
              iconStart={<IoPersonAddSharp />}
            />
            <a href="/login" className="link link-secondary">
              Go to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
