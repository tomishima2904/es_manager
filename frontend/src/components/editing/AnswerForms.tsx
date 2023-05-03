import { useState, useEffect } from "react";
import validateInput from "@/utils/validateInputError";
import FormWithError from "./FormWithError";
import AddAnswerButton from "./AddAnswerButton";
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
      <FormWithError
        text={text}
        handleChange={handleChange}
        error={error}
        placeholder={"解答を入力"}
      />
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

  const handleAddAnswer = (newAnswerProps: AnswersProps) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, ...newAnswerProps }));
  };

  return (
    <div className="mt-1 flex flex-col">
      {Object.keys(_answers).map((aId) => (
        <AnswerForm key={aId} answer={_answers[aId]} />
      ))}
      <AddAnswerButton answers={_answers} setNewProps={handleAddAnswer} />
    </div>
  );
};

export default AnswerForms;
