import { RichEntrysheetProps } from "@/types/EntrysheetProps";

const EditingEntrysheet = (props: {
  entrysheet: RichEntrysheetProps;
}): JSX.Element => {
  const { esId, company, job, event, deadline, questions } = props.entrysheet;
  return <div className="p-1">This is {esId} entrysheet</div>;
};

export default EditingEntrysheet;
