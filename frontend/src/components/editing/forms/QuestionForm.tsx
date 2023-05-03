import { useState } from "react";
import validateInput from "@/utils/validateInputError";
import EditButton from "../buttons/EditButton";
import FormWithError from "./FormWithError";

const limitChars = 100;

// 編集中でなければテキストを表示
const TextDisplay = (props: { text: string }): JSX.Element => {
  return <p>{props.text}</p>;
};

const QuestionForm = (props: { question: string }): JSX.Element => {
  const { question } = props;
  const [text, setText] = useState<string>(question);
  const [error, setError] = useState("");
  // フォームの変更を検知
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = e.target.value;
    setText(inputValue);
    validateInput(inputValue, limitChars, setError);
  };
  // 編集可能にするかを切り替える
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleEditButtonClick = (): void => setIsEditing((prev) => !prev);

  return (
    <div>
      {isEditing ? (
        <div className="flex items-center">
          <FormWithError
            text={text}
            handleChange={handleChange}
            error={error}
            placeholder="例. あなたの強みを教えてください。"
          />
        </div>
      ) : (
        <TextDisplay text={text} />
      )}
      <EditButton isEditing={isEditing} onClick={handleEditButtonClick} />
    </div>
  );
};

export default QuestionForm;
