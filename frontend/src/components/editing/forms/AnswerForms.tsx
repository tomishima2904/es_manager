import { useState, useEffect } from "react";
import validateInput from "@/utils/validateInputError";
import FormWithError from "./FormWithError";
import AddAnswerButton from "../buttons/AddAnswerButton";
import type {
  AnswersProps,
  RichEntrysheetProps,
} from "@/types/EntrysheetProps";

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
  qId: string;
  answers: { [aId: string]: string };
  maxChars: number;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}): JSX.Element => {
  const { qId, answers, maxChars, setEntrysheet } = props;

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
  };

  return (
    <div className="mt-1 flex flex-col">
      {Object.keys(answers).map((aId) => (
        <AnswerForm
          key={aId}
          qId={qId}
          aId={aId}
          answer={answers[aId]}
          maxChars={maxChars}
          setEntrysheet={setEntrysheet}
        />
      ))}
      <AddAnswerButton answers={answers} setNewProps={handleAddAnswer} />
    </div>
  );
};

export default AnswerForms;
