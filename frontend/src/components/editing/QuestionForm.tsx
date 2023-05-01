import { useState } from "react";
import validateInput from "@/utils/validateInputError";

const limitChars = 100;

const EditButton = (props: { onClick: () => void }): JSX.Element => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="bg-white rounded-md"
    >
      Edit
    </button>
  );
};

// 編集中でなければテキストを表示
const TextDisplay = (props: { text: string }): JSX.Element => {
  return <p>{props.text}</p>;
};

// 編集中ならinputタグに置き換える
const EditingDisplay = (props: {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}): JSX.Element => {
  const { text, handleChange, error } = props;
  return (
    <>
      <input
        type="text"
        className="my-form"
        value={text}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
    </>
  );
};

const QuestionForm = (props: { question: string }): JSX.Element => {
  const { question } = props;
  const [text, setText] = useState<string>(question);
  const [error, setError] = useState("");

  // フォームの変更を検知
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    setText(inputValue);
    validateInput(inputValue, limitChars, setError);
  };

  // 編集可能にするかを切り替える
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleEditButtonClick = (): void => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div>
      {isEditing ? (
        <EditingDisplay text={text} handleChange={handleChange} error={error} />
      ) : (
        <TextDisplay text={text} />
      )}
      <EditButton onClick={handleEditButtonClick} />
    </div>
  );
};

export default QuestionForm;
