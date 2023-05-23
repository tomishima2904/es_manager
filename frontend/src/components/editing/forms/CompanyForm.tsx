import { useState } from "react";
import DoubleClickForm from "./DoubleClickForm";
import { RichEntrysheetProps } from "@/types/EntrysheetProps";

const CompanyForm = (props: {
  company: string;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}) => {
  const { company, setEntrysheet } = props;
  const classNames: string[] = [
    "px-2 py-1 rounded-lg border border-gray-300 bg-transparent",
    "text-lg font-bold",
  ];

  const handleCompanyChange = (text: string): void => {
    setEntrysheet((prevEntrysheet: RichEntrysheetProps) => ({
      ...prevEntrysheet,
      company: text,
    }));
  };

  return (
    <div className="flex items-center justify-starth-16">
      <DoubleClickForm
        text={company}
        classNames={classNames}
        onChange={handleCompanyChange}
      />
    </div>
  );
};

export default CompanyForm;
