import { useState, useEffect } from "react";
import CompanyForm from "./forms/CompanyForm";
import MetaForm from "./forms/MetaForm";
import SaveEntrysheetButton from "./buttons/SaveEntrysheetButton";
import type { RichEntrysheetProps } from "@/types/EntrysheetProps";

const Header = (props: {
  company: string;
  job: string;
  event: string;
  entrysheet: RichEntrysheetProps;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}): JSX.Element => {
  const [company, setCompany] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  // レンダリング時にprops.entrysheetが存在する場合は、初期化を実行する
  useEffect(() => {
    if (props.company) setCompany(props.company);
    if (props.job) setJob(props.job);
    if (props.event) setEvent(props.event);
  }, [props]);

  // companyがnullの場合
  if (!company) {
    return <div>Loading...</div>;
  }
  return (
    <header className="flex flex-col border-b border-gray-300 pl-4">
      <CompanyForm company={company} setEntrysheet={props.setEntrysheet} />

      <div className="flex justify-start items-center">
        <div className="flex-initial w-128 pr-4">
          <MetaForm
            job={job}
            event={event}
            setEntrysheet={props.setEntrysheet}
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
