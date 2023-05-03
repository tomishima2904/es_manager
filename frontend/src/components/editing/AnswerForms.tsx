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
  const [_answers, setAnswers] = useState<AnswersProps | null>(null);

  // レンダリング時にprops.answersが存在する場合は、初期化を実行する
  useEffect(() => {
    if (props.answers) {
      setAnswers({ ...props.answers });
    }
  }, [props.answers]);

  if (!_answers) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-2">
      {Object.keys(_answers).map((aId) => (
        <AnswerForm key={aId} answer={_answers[aId]} />
      ))}
    </div>
  );
};

export default AnswerForms;
