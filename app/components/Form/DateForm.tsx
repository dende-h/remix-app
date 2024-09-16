import { FC, useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { IoCalendar } from "react-icons/io5";
import { useField } from "remix-validated-form";

type DateFormProps = {
  formType?: string;
  name: string;
};

export const DateForm: FC<DateFormProps> = ({ name, formType }) => {
  const [selected, setSelected] = useState<Date>();
  const selectedDate = selected
    ? `Date:${selected
        .toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .join("-")}`
    : "The day you finish reading";
  const { error, getInputProps } = useField(name);

  return (
    <>
      <div className={"flex flex-row gap-2 m-2"}>
        <label htmlFor={name} className="flex items-center gap-2">
          <input
            {...getInputProps({ id: name })}
            type={formType}
            className="grow bg-gray-100 cursor-default focus:outline-none select-none w-48"
            value={selectedDate}
            autoComplete="off"
            readOnly
          />
        </label>
        {error && <p className="text-red-600 ml-4">{error}</p>}
        <label htmlFor="my_modal_7" className="btn btn-circle btn-sm">
          {""}
          <IoCalendar size={16} />
        </label>
      </div>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box p-4 w-auto">
          <div className="modal-action mt-0">
            <label className="btn btn-circle btn-sm" htmlFor="my_modal_7">
              ✕
            </label>
          </div>
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          close
        </label>
      </div>
    </>
  );
};
