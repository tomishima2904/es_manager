import type { EntrysheetsProps } from "@/types/EntrysheetProps";
import DateTimeForm from "./DateTimeForm";
import DoubleClickForm from "./DoubleClickForm";

const classNames: string[] = [
  "px-2 py-1 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white mt-1",
  "px-2 py-1 rounded-lg border border-white focus:bg-white mt-1",
];
const wrapper: string = "mr-8 pr-8 flex justify-around items-center";
const borderWrapper: string = wrapper + " border-r border-gray-300";
const spanClassName: string = "mt-1 mr-3 font-bold ";

const JobForm = (props: {
  esId: number;
  job: string;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
}): JSX.Element => {
  const { esId, job, setEntrysheets } = props;

  const handleJobChange = (text: string): void => {
    setEntrysheets((prevEntrysheets: EntrysheetsProps) => ({
      ...prevEntrysheets,
      [esId]: {
        ...prevEntrysheets[esId],
        job: text,
      },
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
  esId: number;
  event: string;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
}): JSX.Element => {
  const { esId, event, setEntrysheets } = props;

  const handleEventChange = (text: string): void => {
    setEntrysheets((prevEntrysheets: EntrysheetsProps) => ({
      ...prevEntrysheets,
      [esId]: {
        ...prevEntrysheets[esId],
        event: text,
      },
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
const DeadlineForm = (props: {
  esId: number;
  deadline: string;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
}): JSX.Element => {
  const { esId, deadline, setEntrysheets } = props;

  const handleDeadlineChange = (text: string): void => {
    setEntrysheets((prevEntrysheets: EntrysheetsProps) => ({
      ...prevEntrysheets,
      [esId]: {
        ...prevEntrysheets[esId],
        deadline: text,
      },
    }));
  };
  return (
    <div className={wrapper}>
      <span className={spanClassName}>締切:</span>
      <DateTimeForm
        datetime={deadline}
        className_={""}
        onChange={handleDeadlineChange}
      />
    </div>
  );
};

const MetaForm = (props: {
  esId: number;
  entrysheets: EntrysheetsProps;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
}): JSX.Element => {
  const { esId, entrysheets, setEntrysheets } = props;
  return (
    <div className="flex justify-start items-center pb-2">
      <JobForm
        esId={esId}
        job={entrysheets[esId].job}
        setEntrysheets={setEntrysheets}
      />
      <EventForm
        esId={esId}
        event={entrysheets[esId].event}
        setEntrysheets={setEntrysheets}
      />
      <DeadlineForm
        esId={esId}
        deadline={entrysheets[esId].deadline}
        setEntrysheets={setEntrysheets}
      />
    </div>
  );
};

export default MetaForm;
