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
  const [qAndAs, setQandAs] = useState<QuestionsProps>({});

  // questionsの値によってレンダリングを再実行
  useEffect(() => {
    setQandAs({ ...questions });
  }, [questions]);

  if (!qAndAs) {
    return <div>Loading...</div>;
  }

  // 質問追加時にステートの状態を変更する関数
  const handleAddQandAs = (newQuestionProps: QuestionsProps) => {
    setQandAs((prevQandAs) => ({ ...prevQandAs, ...newQuestionProps }));
  };

  return (
    <div className="p-4 flex flex-col ">
      <Header company={company} job={job} event={event} />
      {Object.keys(qAndAs).map((qId) => (
        <QandA key={qId} qAndAProps={qAndAs[qId]} />
      ))}
      <AddQandAButton questions={qAndAs} setNewProps={handleAddQandAs} />
    </div>
  );
};

export default EditingEntrysheet;
