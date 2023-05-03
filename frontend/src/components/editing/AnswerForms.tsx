import { useState, useEffect } from "react";
import validateInput from "@/utils/validateInputError";
import type { AnswersProps } from "@/types/EntrysheetProps";

const limitChars = 2000;

// 編集中ならinputタグに置き換える
const EditingDisplay = (props: {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string;
}): JSX.Element => {
  const { text, handleChange, error } = props;
  return (
    <div className="p-1">
      <textarea className="my-form" value={text} onChange={handleChange} />
      {error && <p>{error}</p>}
    </div>
  );
};

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
    <EditingDisplay text={text} handleChange={handleChange} error={error} />
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
