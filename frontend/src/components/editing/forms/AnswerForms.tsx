import { useState, useEffect } from "react";
import validateInput from "@/utils/validateInputError";
import FormWithError from "./FormWithError";
import AddAnswerButton from "../buttons/AddAnswerButton";
import type { AnswersProps } from "@/types/EntrysheetProps";

const limitChars = 2000;

// TODO: QuestionFormと似たようなコンポーネントが多いのでリファクタリングする

const AnswerForm = (props: {
  answer: string;
  maxChars: number;
}): JSX.Element => {
  const { answer, maxChars } = props;
  const [text, setText] = useState<string>(answer);
  const [error, setError] = useState<string>("");
  const [isOver, setIsOver] = useState<boolean>(false);

  // フォームの変更を検知
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setText(inputValue);
    validateInput(inputValue, limitChars, setError);
    // 規定の文字数を超えたらisOverをtrueにしてフォームが赤くなるようにする
    inputValue.length > maxChars ? setIsOver(true) : setIsOver(false);
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

// TODO: SetCharsFormの変更も検知してフォームのスタイルを変更
const AnswerForms = (props: {
  maxChars: number;
  answers: { [aId: string]: string };
}): JSX.Element => {
  const [answers, setAnswers] = useState<AnswersProps | null>(null);

  // レンダリング時にprops.answersが存在する場合は、初期化を実行する
  useEffect(() => {
    if (props.answers) {
      setAnswers({ ...props.answers });
    }
  }, [props.answers]);

  if (!answers) {
    return <div>Loading...</div>;
  }

  const handleAddAnswer = (newAnswerProps: AnswersProps) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, ...newAnswerProps }));
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
