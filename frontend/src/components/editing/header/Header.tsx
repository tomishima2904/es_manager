import { useState, useEffect } from "react";

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
    if (props.company && props.job && props.event) {
      setCompany(props.company);
      setJob(props.job);
      setEvent(props.event);
    }
  }, [props]);

  // 適当にeventがnullのとき (eventじゃなくてもいい)
  if (!event) {
    return <div>Loading...</div>;
  }
  return <header className="border-b border-gray-300">Hello world</header>;
};

export default Header;
