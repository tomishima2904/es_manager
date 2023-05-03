import { useState, useEffect } from "react";
import type {
  RichEntrysheetProps,
  QuestionsProps,
} from "@/types/EntrysheetProps";
import QandA from "./QandA";
import AddQandAButton from "./AddQandAButton";

const EditingEntrysheet = (props: {
  entrysheet: RichEntrysheetProps;
}): JSX.Element => {
  const { esId, company, job, event, deadline, questions } = props.entrysheet;
  // コンポーネントが最初にレンダリングされたときに、props.entrysheetの値が設定されない
  // そこで遅延初期化を行うため、nullを入れておく
  const [qAndAs, setQandAs] = useState<QuestionsProps | null>(null);

  // レンダリング時にprops.entrysheetが存在する場合は、初期化を実行する
  useEffect(() => {
    if (props.entrysheet) {
      setQandAs({ ...props.entrysheet.questions });
    }
  }, [props.entrysheet]);

  if (!qAndAs) {
    return <div>Loading...</div>;
  }

  // 質問追加時にステートの状態を変更する関数
  const handleAddQandAs = (newQuestionProps: QuestionsProps) => {
    setQandAs((prevQandAs) => ({ ...prevQandAs, ...newQuestionProps }));
  };

  return (
    <div className="p-4 flex flex-col ">
      {Object.keys(qAndAs).map((qId) => (
        <QandA key={qId} qAndAProps={qAndAs[qId]} />
      ))}
      <AddQandAButton questions={qAndAs} handleAddQandAs={handleAddQandAs} />
    </div>
  );
};

export default EditingEntrysheet;
