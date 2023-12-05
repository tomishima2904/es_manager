import { EditingEntrysheetsProps } from "@/types/EntrysheetProps";
import validateInput from "@/utils/validateInputError";
import { useEffect, useState } from "react";
import RemoveFormButton from "./buttons/RemoveFormButton";
import FormWithError from "./forms/FormWithError";

const AnswerForm = (props: {
  esId: number;
  qId: string;
  aId: string;
  answer: string;
  maxChars: number;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const { esId, qId, aId, answer, maxChars, setEditingEntrysheets } = props;
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
                [aId]: text,
              },
            },
          },
        },
      })
    );
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
  esId: number;
  qId: string;
  aId: string;
  answer: string;
  maxChars: number;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  numAnswers: number;
  setNumAnswers: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
  const {
    esId,
    qId,
    aId,
    answer,
    maxChars,
    setEditingEntrysheets,
    numAnswers,
    setNumAnswers,
  } = props;

  const handleRemoveAnswer = (): void => {
    setEditingEntrysheets((prevEditingEntrysheets: EditingEntrysheetsProps) => {
      const updatedQuestions = { ...prevEditingEntrysheets[esId].questions };
      const updatedAnswers = { ...updatedQuestions[qId].answers };
      delete updatedAnswers[aId];
      updatedQuestions[qId] = {
        ...updatedQuestions[qId],
        answers: updatedAnswers,
      };
      return {
        ...prevEditingEntrysheets,
        [esId]: {
          ...prevEditingEntrysheets[esId],
          questions: updatedQuestions,
        },
      };
    });
    setNumAnswers((prev) => prev - 1);
  };

  return (
    <div className="flex items-center">
      <AnswerForm
        key={aId}
        esId={esId}
        qId={qId}
        aId={aId}
        answer={answer}
        maxChars={maxChars}
        setEditingEntrysheets={setEditingEntrysheets}
      />
      {numAnswers > 1 && (
        <RemoveFormButton handleRemoveForm={handleRemoveAnswer} />
      )}
    </div>
  );
};

export default AnswerArea;
