const JobForm = (props: { job: string | null }): JSX.Element => {
  const { job } = props;
  return <div className="border-r border-gray-300 mr-8 pr-8">職種: {job}</div>;
};

const EventForm = (props: { event: string | null }): JSX.Element => {
  const { event } = props;
  return (
    <div className="border-r border-gray-300 mr-8 pr-8">イベント: {event}</div>
  );
};

const DeadlineForm = (): JSX.Element => {
  return <div>締切: hoge</div>;
};

// job と event は null でも良い
const MetaForm = (props: {
  job: string | null;
  event: string | null;
}): JSX.Element => {
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
