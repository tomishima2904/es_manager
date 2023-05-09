import { useState, useEffect } from "react";
import CompanyForm from "./forms/CompanyForm";
import MetaForm from "./forms/MetaForm";

const Header = (props: {
  company: string;
  job: string;
  event: string;
}): JSX.Element => {
  const [company, setCompany] = useState<string>(props.company);
  const [job, setJob] = useState<string>(props.job);
  const [event, setEvent] = useState<string>(props.event);
  // レンダリング時にprops.entrysheetが存在する場合は、初期化を実行する
  useEffect(() => {
    if (company) setCompany(company);
    if (job) setJob(job);
    if (event) setEvent(event);
  }, [company, job, event]);

  return (
    <header className="flex flex-col border-b border-gray-300 pl-4">
      <CompanyForm company={company} />
      <MetaForm job={job} event={event} />
    </header>
  );
};

export default Header;
