import { useState, useEffect } from "react";
import type {
  RichEntrysheetProps,
  QuestionsProps,
} from "@/types/EntrysheetProps";
import Header from "./Header";
import QandA from "./QandA";
import AddQandAButton from "./buttons/AddQandAButton";
import SaveEntrysheetButton from "./buttons/SaveEntrysheetButton";

const EditingEntrysheet = (props: {
  entrysheet: RichEntrysheetProps;
}): JSX.Element => {
  const { esId, company, job, event, deadline, questions } = props.entrysheet;
  const [entrysheet, setEntrysheet] = useState<RichEntrysheetProps>({
    esId: esId,
    company: company,
    job: job,
    event: event,
    deadline: deadline,
    questions: {},
  });

  useEffect(() => {
    setEntrysheet({
      esId: esId,
      company: company,
      job: job,
      event: event,
      deadline: deadline,
      questions: { ...questions },
    });
  }, [esId, company, job, event, deadline, questions]);

  if (!entrysheet) {
    return <div>Loading...</div>;
  }

  // 質問追加時にステートの状態を変更する関数
  const handleAddQandAs = (newQuestionProps: QuestionsProps) => {
    setEntrysheet((prevEntrysheet) => ({
      ...prevEntrysheet,
      questions: {
        ...prevEntrysheet.questions,
        ...newQuestionProps,
      },
    }));
  };

  return (
    <div className="p-4 flex flex-col ">
      <Header
        company={company}
        job={job}
        event={event}
        setEntrysheet={setEntrysheet}
      />
      {Object.keys(entrysheet.questions).map((qId) => (
        <QandA
          key={qId}
          qId={qId}
          qAndAProps={entrysheet.questions[qId]}
          setEntrysheet={setEntrysheet}
        />
      ))}
      <AddQandAButton
        questions={entrysheet.questions}
        setNewProps={handleAddQandAs}
      />
      <SaveEntrysheetButton entrysheet={entrysheet} />
    </div>
  );
};

export default EditingEntrysheet;
