import { RichEntrysheetProps } from "@/types/EntrysheetProps";
import DoubleClickForm from "./DoubleClickForm";

const CompanyForm = (props: {
  company: string;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}) => {
  const { company, setEntrysheet } = props;
  const classNames: string[] = [
    "px-2 py-0.5 rounded-lg border border-gray-300 bg-transparent",
    "text-lg font-bold px-2 py-0.5 rounded-lg border border-white bg-transparent",
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
        placeholder="企業名"
        onChange={handleCompanyChange}
      />
    </div>
  );
};

export default CompanyForm;
