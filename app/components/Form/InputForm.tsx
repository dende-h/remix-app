import { FC } from "react";
import { useField } from "remix-validated-form";

type InputFormProps = {
  placeholder: string;
  iconElement: JSX.Element;
  formType?: string;
  name: string;
};

export const InputForm: FC<InputFormProps> = ({
  placeholder,
  iconElement,
  name,
  formType = "text",
}) => {
  const { error, getInputProps } = useField(name);
  return (
    <>
      <label
        htmlFor={name}
        className="input input-bordered flex items-center gap-2"
      >
        {iconElement}
        <input
          {...getInputProps({ id: name })}
          type={formType}
          className="grow"
          placeholder={placeholder}
          autoComplete="off"
        />
      </label>
      {error && <p className="text-red-600 ml-4">{error}</p>}
    </>
  );
};
