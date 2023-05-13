import { useState, useEffect } from "react";
import type {
  RichEntrysheetProps,
  QuestionsProps,
} from "@/types/EntrysheetProps";
import Header from "./Header";
import QandA from "./QandA";
import AddQandAButton from "./buttons/AddQandAButton";

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

  // questionsの値によってentrysheetを更新する
  useEffect(() => {
    setEntrysheet((prevEntrySheet) => ({
      ...prevEntrySheet,
      questions: { ...questions },
    }));
  }, [questions]);

  if (!entrysheet) {
    return <div>Loading...</div>;
  }

  // 質問追加時にステートの状態を変更する関数
  const handleAddQandAs = (newQuestionProps: QuestionsProps) => {
    setEntrysheet((prevQandAs) => ({ ...prevQandAs, ...newQuestionProps }));
  };

  return (
    <div className="p-4 flex flex-col ">
      <Header company={company} job={job} event={event} />
      {Object.keys(entrysheet.questions).map((qId) => (
        <QandA key={qId} qAndAProps={entrysheet.questions[qId]} />
      ))}
      <AddQandAButton
        questions={entrysheet.questions}
        setNewProps={handleAddQandAs}
      />
    </div>
  );
};

export default EditingEntrysheet;
