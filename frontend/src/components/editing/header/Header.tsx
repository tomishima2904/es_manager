import { useState, useEffect } from "react";
import CompanyForm from "../forms/CompanyForm";
import MetaForm from "../forms/MetaForm";

const Header = (props: {
  company: string;
  job: string;
  event: string;
}): JSX.Element => {
  const [company, setCompany] = useState<string | null>(null);
  const [job, setJob] = useState<string | null>(null);
  const [event, setEvent] = useState<string | null>(null);
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
    <header className="flex flex-col border-b border-gray-300">
      <CompanyForm company={company} />
      <MetaForm job={job} event={event} />
    </header>
  );
};

export default Header;
