import { FC } from "react";

type PrimaryButtonProps = {
  buttonText: string;
  disabled?: boolean;
  iconStart?: JSX.Element;
  iconEnd?: JSX.Element;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  buttonText,
  disabled,
  iconStart,
  iconEnd,
}) => {
  return (
    <button
      className="btn btn-outline btn-primary w-full text-lg"
      disabled={disabled}
    >
      {iconStart && iconStart}
      {buttonText}
      {iconEnd && iconEnd}
    </button>
  );
};
