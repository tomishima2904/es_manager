import { useState, useEffect } from "react";
import validateInput from "@/utils/validateInputError";
import FormWithError from "./FormWithError";
import AddAnswerButton from "../buttons/AddAnswerButton";
import RemoveAnswerButton from "../buttons/RemoveAnswerButton";
import type { RichEntrysheetProps } from "@/types/EntrysheetProps";

const AnswerForm = (props: {
  qId: string;
  aId: string;
  answer: string;
  maxChars: number;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}): JSX.Element => {
  const { qId, aId, answer, maxChars, setEntrysheet } = props;
  const [text, setText] = useState<string>(answer);
  const [error, setError] = useState<string>("");
  const [isOver, setIsOver] = useState<boolean>(false);

  // DBに格納できる限界の文字列の長さ
  const limitChars = 2000;

  // SetCharsFormでの文字数の変更を検知して、文字数が超過してるか判断
  useEffect(() => {
    setIsOver(text.length > maxChars);
  }, [text, maxChars]);

  // answerの変更をEditingEntrysheetに即時反映
  const handleAnswerChange = (text: string): void => {
    setEntrysheet((prevEntrySheet) => ({
      ...prevEntrySheet,
      questions: {
        ...prevEntrySheet.questions,
        [qId]: {
          ...prevEntrySheet.questions[qId],
          answers: {
            ...prevEntrySheet.questions[qId].answers,
            [aId]: text,
          },
        },
      },
    }));
  };

  // フォームの変更を検知
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);
    validateInput(inputValue, limitChars, setError);
    // 規定の文字数を超えたらisOverをtrueにしてフォームが赤くなるようにする
    setIsOver(inputValue.length > maxChars);
    handleAnswerChange(inputValue);
  };

  return (
    <div className="pt-1 flex-1 ">
      <FormWithError
        text={text}
        handleChange={handleChange}
        isOver={isOver}
        error={error}
        placeholder={"解答を入力"}
      />
    </div>
  );
};

const AnswerArea = (props: {
  qId: string;
  aId: string;
  answer: string;
  maxChars: number;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
  numAnswers: number;
  setNumAnswers: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
  const {
    qId,
    aId,
    answer,
    maxChars,
    setEntrysheet,
    numAnswers,
    setNumAnswers,
  } = props;

  const handleRemoveAnswer = (): void => {
    setEntrysheet((prevEntrysheet) => {
      const updatedQuestions = { ...prevEntrysheet.questions };
      const updatedAnswers = { ...updatedQuestions[qId].answers };
      delete updatedAnswers[aId];
      updatedQuestions[qId] = {
        ...updatedQuestions[qId],
        answers: updatedAnswers,
      };
      return { ...prevEntrysheet, questions: updatedQuestions };
    });
    setNumAnswers((prev) => prev - 1);
  };

  return (
    <div className="flex items-center">
      <AnswerForm
        key={aId}
        qId={qId}
        aId={aId}
        answer={answer}
        maxChars={maxChars}
        setEntrysheet={setEntrysheet}
      />
      {numAnswers > 1 && (
        <RemoveAnswerButton handleRemoveAnswer={handleRemoveAnswer} />
      )}
    </div>
  );
};

export default AnswerArea;
