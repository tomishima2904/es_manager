import { useState, useEffect } from "react";
import validateInput from "@/utils/validateInputError";
import FormWithError from "./FormWithError";
import AddAnswerButton from "../buttons/AddAnswerButton";
import type { AnswersProps } from "@/types/EntrysheetProps";

const AnswerForm = (props: {
  answer: string;
  maxChars: number;
}): JSX.Element => {
  const { answer, maxChars } = props;
  const [text, setText] = useState<string>(answer);
  const [error, setError] = useState<string>("");
  const [isOver, setIsOver] = useState<boolean>(false);

  // DBに格納できる限界の文字列の長さ
  const limitChars = 2000;

  // SetCharsFormでの文字数の変更を検知して、文字数が超過してるか判断
  useEffect(() => {
    setIsOver(text.length > maxChars);
  }, [text, maxChars]);

  // フォームの変更を検知
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);
    validateInput(inputValue, limitChars, setError);
    // 規定の文字数を超えたらisOverをtrueにしてフォームが赤くなるようにする
    setIsOver(inputValue.length > maxChars);
  };

  return (
    <div className="pt-1">
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

const AnswerForms = (props: {
  answers: { [aId: string]: string };
  maxChars: number;
}): JSX.Element => {
  const { answers, maxChars } = props;
  const [answerData, setAnswerData] = useState<AnswersProps>({});

  useEffect(() => {
    setAnswerData({ ...answers });
  }, [answers]);

  const handleAddAnswer = (newAnswerProps: AnswersProps) => {
    setAnswerData((prevAnswerData) => ({
      ...prevAnswerData,
      ...newAnswerProps,
    }));
  };

  return (
    <div className="mt-1 flex flex-col">
      {Object.keys(answers).map((aId) => (
        <AnswerForm key={aId} answer={answers[aId]} maxChars={props.maxChars} />
      ))}
      <AddAnswerButton answers={answers} setNewProps={handleAddAnswer} />
    </div>
  );
};

export default AnswerForms;
