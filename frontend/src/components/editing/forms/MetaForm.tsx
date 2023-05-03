import DoubleClickForm from "./DoubleClickForm";

const classNames: string[] = [
  "px-2 py-1 rounded-lg border border-gray-300 bg-transparent",
  "",
];
const wrapper: string = "mr-8 pr-8 flex justify-around items-center";
const borderWrapper: string = wrapper + " border-r border-gray-300";
const spanClassName: string = "mr-3 font-bold ";

const JobForm = (props: { job: string }): JSX.Element => {
  const { job } = props;
  return (
    <div className={borderWrapper}>
      <span className={spanClassName}>職種:</span>
      <DoubleClickForm text={job} classNames={classNames} />
    </div>
  );
};

const EventForm = (props: { event: string }): JSX.Element => {
  const { event } = props;
  return (
    <div className={borderWrapper}>
      <span className={spanClassName}>イベント:</span>
      <DoubleClickForm text={event} classNames={classNames} />
    </div>
  );
};

const DeadlineForm = (): JSX.Element => {
  return (
    <div className={wrapper}>
      <span className={spanClassName}>締切:</span>
      <DoubleClickForm text={"ほげ"} classNames={classNames} />
    </div>
  );
};

// job と event は null でも良い
const MetaForm = (props: { job: string; event: string }): JSX.Element => {
  const { job, event } = props;
  return (
    <div className="flex justify-start items-center p-2">
      <JobForm job={job} />
      <EventForm event={event} />
      <DeadlineForm />
    </div>
  );
};

export default MetaForm;
