import { FC, MouseEventHandler } from "react";

type PrimaryButtonProps = {
  buttonText: string;
  disabled?: boolean;
  iconStart?: JSX.Element;
  iconEnd?: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: "submit" | "reset" | "button" | undefined;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  buttonText,
  disabled,
  iconStart,
  iconEnd,
  onClick,
  type,
}) => {
  return (
    <button
      className="btn btn-outline btn-primary w-full text-lg"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {iconStart && iconStart}
      {buttonText}
      {iconEnd && iconEnd}
    </button>
  );
};
