import { EditingEntrysheetsProps } from "@/types/EntrysheetProps";
import DoubleClickForm from "./DoubleClickForm";

const CompanyForm = (props: {
  company: string;
  esId: number;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}) => {
  const { company, esId, setEditingEntrysheets } = props;
  const classNames: string[] = [
    "px-2 py-0.5 rounded-lg border border-gray-300 bg-transparent",
    "text-lg font-bold px-2 py-0.5 rounded-lg border border-white bg-transparent",
  ];

  const handleCompanyChange = (text: string): void => {
    setEditingEntrysheets(
      (prevEditingEntrysheets: EditingEntrysheetsProps) => ({
        ...prevEditingEntrysheets,
        [esId]: {
          ...prevEditingEntrysheets[esId],
          company: text,
        },
      })
    );
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
