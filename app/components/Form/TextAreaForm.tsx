import { FC } from "react";
import { useField } from "remix-validated-form";

type TextAreaFormProps = {
  placeholder: string;
  iconElement: JSX.Element;
  name: string;
};

export const TextAreaForm: FC<TextAreaFormProps> = ({ placeholder, name }) => {
  const { error, getInputProps } = useField(name);

  return (
    <>
      <textarea
        {...getInputProps({ id: name })}
        className="textarea textarea-bordered grow resize-none h-56 text-base"
        placeholder={placeholder}
        autoComplete="off"
      />

      {error && <p className="text-red-600 ml-4">{error}</p>}
    </>
  );
};
