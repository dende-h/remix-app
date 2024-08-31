import { FC } from "react";

type LinkButtonProps = {
  buttonText: string;
  iconStart?: JSX.Element;
  iconEnd?: JSX.Element;
  routePath: string;
};

export const LinkButton: FC<LinkButtonProps> = ({
  buttonText,
  iconStart,
  iconEnd,
  routePath,
}) => {
  return (
    <a
      href={routePath}
      role="button"
      className="btn btn-outline btn-secondary w-full text-lg"
    >
      {iconStart && iconStart}
      {buttonText}
      {iconEnd && iconEnd}
    </a>
  );
};
