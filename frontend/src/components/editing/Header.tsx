import type {
  EditingEntrysheetsProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import SaveEntrysheetButton from "./buttons/SaveEntrysheetButton";
import CompanyForm from "./forms/CompanyForm";
import MetaForm from "./forms/MetaForm";

const Header = (props: {
  esId: number;
  entrysheets: EntrysheetsProps;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  editingEntrysheets: EditingEntrysheetsProps;
}): JSX.Element => {
  const esId: number = props.esId;
  const company: string = props.entrysheets[esId].company;

  // companyがnullの場合
  if (!company) {
    return <div>Loading...</div>;
  }
  return (
    <header className="flex flex-col border-b border-gray-300 pl-4">
      <CompanyForm
        esId={esId}
        company={company}
        setEntrysheets={props.setEntrysheets}
      />

      <div className="flex justify-start items-center">
        <div className="flex-initial w-128 pr-4">
          <MetaForm
            esId={esId}
            entrysheets={props.entrysheets}
            setEntrysheets={props.setEntrysheets}
          />
        </div>
        <div className="flex-none">
          <SaveEntrysheetButton
            esId={esId}
            entrysheets={props.entrysheets}
            editingEntrysheets={props.editingEntrysheets}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
