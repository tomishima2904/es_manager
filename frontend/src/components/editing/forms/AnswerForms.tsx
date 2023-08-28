import { useState, useEffect } from "react";
import validateInput from "@/utils/validateInputError";
import FormWithError from "./FormWithError";
import AddAnswerButton from "../buttons/AddAnswerButton";
import AnswerArea from "../AnswerArea";
import type {
  AnswersProps,
  RichEntrysheetProps,
} from "@/types/EntrysheetProps";

const AnswerForms = (props: {
  qId: string;
  answers: { [aId: string]: string };
  maxChars: number;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}): JSX.Element => {
  const { qId, answers, maxChars, setEntrysheet } = props;

  // 解答フォームの数
  const [numAnswers, setNumAnswers] = useState<number>(
    Object.keys(answers).length
  );

  // 解答フォームの追加を行う
  const handleAddAnswer = (newAnswerProps: AnswersProps) => {
    setEntrysheet((prevEntrySheet: RichEntrysheetProps) => ({
      ...prevEntrySheet,
      questions: {
        ...prevEntrySheet.questions,
        [qId]: {
          ...prevEntrySheet.questions[qId],
          answers: {
            ...prevEntrySheet.questions[qId].answers,
            ...newAnswerProps,
          },
        },
      },
    }));
    setNumAnswers((prev) => prev + 1);
  };

  return (
    <div className="mt-1 flex flex-col">
      {Object.keys(answers).map((aId) => (
        <AnswerArea
          key={aId}
          qId={qId}
          aId={aId}
          answer={answers[aId]}
          maxChars={maxChars}
          setEntrysheet={setEntrysheet}
          numAnswers={numAnswers}
          setNumAnswers={setNumAnswers}
        />
      ))}
      <AddAnswerButton answers={answers} setNewProps={handleAddAnswer} />
    </div>
  );
};

export default AnswerForms;
