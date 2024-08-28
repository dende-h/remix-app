import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type InputFormProps<T extends FieldValues> = {
  placeholder: string;
  iconElement: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & UseControllerProps<T>;

export const InputForm = <T extends FieldValues>({
  placeholder,
  iconElement,
  name,
  control,
  rules,
  defaultValue,
}: InputFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });
  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        {iconElement}
        <input
          type="text"
          className="grow"
          {...field}
          placeholder={placeholder}
        />
      </label>
      {error && <p className="text-red-600 ml-4">{error.message}</p>}
    </>
  );
};
