import type { EditingEntrysheetsProps } from "@/types/EntrysheetProps";
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
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const { esId, job, setEditingEntrysheets } = props;

  const handleJobChange = (text: string): void => {
    setEditingEntrysheets(
      (prevEditingEntrysheets: EditingEntrysheetsProps) => ({
        ...prevEditingEntrysheets,
        [esId]: {
          ...prevEditingEntrysheets[esId],
          job: text,
        },
      })
    );
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
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const { esId, event, setEditingEntrysheets } = props;

  const handleEventChange = (text: string): void => {
    setEditingEntrysheets(
      (prevEditingEntrysheets: EditingEntrysheetsProps) => ({
        ...prevEditingEntrysheets,
        [esId]: {
          ...prevEditingEntrysheets[esId],
          event: text,
        },
      })
    );
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
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const { esId, deadline, setEditingEntrysheets } = props;

  const handleDeadlineChange = (text: string): void => {
    setEditingEntrysheets(
      (prevEditingEntrysheets: EditingEntrysheetsProps) => ({
        ...prevEditingEntrysheets,
        [esId]: {
          ...prevEditingEntrysheets[esId],
          deadline: text,
        },
      })
    );
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
  job: string;
  event: string;
  deadline: string;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const { esId, job, event, deadline, setEditingEntrysheets } = props;
  return (
    <div className="flex justify-start items-center pb-2">
      <JobForm
        esId={esId}
        job={job}
        setEditingEntrysheets={setEditingEntrysheets}
      />
      <EventForm
        esId={esId}
        event={event}
        setEditingEntrysheets={setEditingEntrysheets}
      />
      <DeadlineForm
        esId={esId}
        deadline={deadline}
        setEditingEntrysheets={setEditingEntrysheets}
      />
    </div>
  );
};

export default MetaForm;
