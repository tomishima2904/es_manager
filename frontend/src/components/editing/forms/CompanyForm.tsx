import { useState } from "react";
import DoubleClickForm from "./DoubleClickForm";

const CompanyForm = (props: { company: string }) => {
  const { company } = props;
  const classNames: string[] = [
    "px-2 py-1 rounded-lg border border-gray-300 bg-transparent",
    "text-lg font-bold",
  ];

  return (
    <div className="flex items-center justify-starth-16">
      <DoubleClickForm text={company} classNames={classNames} />
    </div>
  );
};

export default CompanyForm;
