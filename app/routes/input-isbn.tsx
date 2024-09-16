import { withZod } from "@rvf/zod";
import { inputBookInfo } from "constants/zodVlidationSchema";
import { FaUserEdit } from "react-icons/fa";
import { FaBook, FaTag } from "react-icons/fa6";
import { HiLibrary } from "react-icons/hi";
import { IoLibrarySharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { ValidatedForm } from "remix-validated-form";
import { PrimaryButton } from "~/components/Button/PrimaryButton";
import { DateForm } from "~/components/Form/DateForm";
import { InputForm } from "~/components/Form/InputForm";
import { TextAreaForm } from "~/components/Form/TextAreaForm";

const validator = withZod(inputBookInfo);
export default function InputIsbn() {
  return (
    <div className="px-96 py-12">
      <ValidatedForm
        method="post"
        validator={validator}
        className="flex flex-col gap-2"
      >
        <DateForm name="finishedDate" formType="text" />
        <InputForm
          name="bookTitle"
          iconElement={<FaBook />}
          placeholder="Book title"
        />
        <InputForm
          name="author"
          iconElement={<FaUserEdit />}
          placeholder="Author"
        />
        <InputForm
          name="publisher"
          iconElement={<HiLibrary />}
          placeholder="Publisher"
        />
        <TextAreaForm
          name="review"
          iconElement={<MdOutlineRateReview />}
          placeholder="Your review"
        />
        <InputForm name="genre" iconElement={<FaTag />} placeholder="Genre" />
        <div className="flex flex-col gap-4 items-center my-6">
          <PrimaryButton
            buttonText="Register a book"
            iconStart={<IoLibrarySharp />}
            type="submit"
          />
          <a href="/dashboard" className="link link-secondary">
            Go to dashboard
          </a>
        </div>
      </ValidatedForm>
    </div>
  );
}
