import { useState, useEffect } from "react";
import CompanyForm from "./forms/CompanyForm";
import MetaForm from "./forms/MetaForm";
import type { RichEntrysheetProps } from "@/types/EntrysheetProps";

const Header = (props: {
  company: string;
  job: string;
  event: string;
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
      <MetaForm job={job} event={event} />
    </header>
  );
};

export default Header;
