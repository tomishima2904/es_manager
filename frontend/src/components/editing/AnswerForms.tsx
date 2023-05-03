import { useState, useEffect } from "react";
import validateInput from "@/utils/validateInputError";
import FormWithError from "./FormWithError";
import type { AnswersProps } from "@/types/EntrysheetProps";

const limitChars = 2000;

// TODO: QuestionFormと似たようなコンポーネントが多いのでリファクタリングする

const AnswerForm = (props: { answer: string }): JSX.Element => {
  const { answer } = props;
  const [text, setText] = useState<string>(answer);
  const [error, setError] = useState("");

  // フォームの変更を検知
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);
    validateInput(inputValue, limitChars, setError);
  };
  return (
    <div className="pt-1">
      <FormWithError text={text} handleChange={handleChange} error={error} />
    </div>
  );
};

const AnswerForms = (props: {
  maxChars: number;
  answers: { [aId: string]: string };
}): JSX.Element => {
  const { answers } = props;
  return (
    <div className="mt-1">
      {Object.keys(answers).map((aId) => (
        <AnswerForm key={aId} answer={answers[aId]} />
      ))}
    </div>
  );
};

export default AnswerForms;
