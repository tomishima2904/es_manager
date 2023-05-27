import DoubleClickForm from "./DoubleClickForm";
import type { RichEntrysheetProps } from "@/types/EntrysheetProps";

const classNames: string[] = [
  "px-2 py-1 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white mt-1",
  "",
];
const wrapper: string = "mr-8 pr-8 flex justify-around items-center";
const borderWrapper: string = wrapper + " border-r border-gray-300";
const spanClassName: string = "mr-3 font-bold ";

const JobForm = (props: {
  job: string;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}): JSX.Element => {
  const { job, setEntrysheet } = props;

  const handleJobChange = (text: string): void => {
    setEntrysheet((prevEntrysheet: RichEntrysheetProps) => ({
      ...prevEntrysheet,
      job: text,
    }));
  };

  return (
    <div className={borderWrapper}>
      <span className={spanClassName}>職種:</span>
      <DoubleClickForm
        text={job}
        placeholder="例. 総合職"
        classNames={classNames}
        onChange={handleJobChange}
      />
    </div>
  );
};

const EventForm = (props: {
  event: string;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}): JSX.Element => {
  const { event, setEntrysheet } = props;

  const handleEventChange = (text: string): void => {
    setEntrysheet((prevEntrysheet: RichEntrysheetProps) => ({
      ...prevEntrysheet,
      event: text,
    }));
  };

  return (
    <div className={borderWrapper}>
      <span className={spanClassName}>イベント:</span>
      <DoubleClickForm
        text={event}
        placeholder="例. 夏インターン"
        classNames={classNames}
        onChange={handleEventChange}
      />
    </div>
  );
};

// TODO: 仮のフォームなので完成させる
const DeadlineForm = (): JSX.Element => {
  const handleDeadlineChange = (text: string): void => {};
  return (
    <div className={wrapper}>
      <span className={spanClassName}>締切:</span>
      <DoubleClickForm
        text={"ほげ"}
        placeholder=""
        classNames={classNames}
        onChange={handleDeadlineChange}
      />
    </div>
  );
};

const MetaForm = (props: {
  job: string;
  event: string;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}): JSX.Element => {
  const { job, event, setEntrysheet } = props;
  return (
    <div className="flex justify-start items-center pb-2">
      <JobForm job={job} setEntrysheet={setEntrysheet} />
      <EventForm event={event} setEntrysheet={setEntrysheet} />
      <DeadlineForm />
    </div>
  );
};

export default MetaForm;
