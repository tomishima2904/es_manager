import type {
  EditingEntrysheetsProps,
  RichEntrysheetProps,
} from "@/types/EntrysheetProps";
import { useEffect, useState } from "react";
import SaveEntrysheetButton from "./buttons/SaveEntrysheetButton";
import CompanyForm from "./forms/CompanyForm";
import MetaForm from "./forms/MetaForm";

const Header = (props: {
  esId: number;
  company: string;
  job: string;
  event: string;
  deadline: string;
  entrysheet: RichEntrysheetProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const esId: number = props.esId;
  const [company, setCompany] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  // レンダリング時にprops.entrysheetが存在する場合は、初期化を実行する
  useEffect(() => {
    if (props.company) setCompany(props.company);
    if (props.job) setJob(props.job);
    if (props.event) setEvent(props.event);
    if (props.deadline) setDeadline(props.deadline);
  }, [props]);

  // companyがnullの場合
  if (!company) {
    return <div>Loading...</div>;
  }
  return (
    <header className="flex flex-col border-b border-gray-300 pl-4">
      <CompanyForm
        esId={esId}
        company={company}
        setEditingEntrysheets={props.setEditingEntrysheets}
      />

      <div className="flex justify-start items-center">
        <div className="flex-initial w-128 pr-4">
          <MetaForm
            esId={esId}
            job={job}
            event={event}
            deadline={deadline}
            setEditingEntrysheets={props.setEditingEntrysheets}
          />
        </div>
        <div className="flex-none">
          <SaveEntrysheetButton entrysheet={props.entrysheet} />
        </div>
      </div>
    </header>
  );
};

export default Header;
