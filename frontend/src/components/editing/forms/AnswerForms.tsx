import type {
  AnswersProps,
  EditingEntrysheetsProps,
} from "@/types/EntrysheetProps";
import { useState } from "react";
import AnswerArea from "../AnswerArea";
import AddAnswerButton from "../buttons/AddAnswerButton";

const AnswerForms = (props: {
  esId: number;
  qId: string;
  answers: { [aId: string]: string };
  maxChars: number;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const { esId, qId, answers, maxChars, setEditingEntrysheets } = props;

  // 解答フォームの数
  const [numAnswers, setNumAnswers] = useState<number>(
    Object.keys(answers).length
  );

  // 解答フォームの追加を行う
  const handleAddAnswer = (newAnswerProps: AnswersProps) => {
    setEditingEntrysheets(
      (prevEditingEntrysheets: EditingEntrysheetsProps) => ({
        ...prevEditingEntrysheets,
        [esId]: {
          ...prevEditingEntrysheets[esId],
          questions: {
            ...prevEditingEntrysheets[esId].questions,
            [qId]: {
              ...prevEditingEntrysheets[esId].questions[qId],
              answers: {
                ...prevEditingEntrysheets[esId].questions[qId].answers,
                ...newAnswerProps,
              },
            },
          },
        },
      })
    );
    setNumAnswers((prev) => prev + 1);
  };

  return (
    <div className="mt-1 flex flex-col">
      {Object.keys(answers).map((aId) => (
        <AnswerArea
          key={aId}
          esId={esId}
          qId={qId}
          aId={aId}
          answer={answers[aId]}
          maxChars={maxChars}
          setEditingEntrysheets={setEditingEntrysheets}
          numAnswers={numAnswers}
          setNumAnswers={setNumAnswers}
        />
      ))}
      <AddAnswerButton answers={answers} setNewProps={handleAddAnswer} />
    </div>
  );
};

export default AnswerForms;
