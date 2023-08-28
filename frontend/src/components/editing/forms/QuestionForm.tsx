import { useState } from "react";
import validateInput from "@/utils/validateInputError";

const QuestionForm = (props: {
  question: string;
  onChange: (text: string) => void;
}): JSX.Element => {
  const [text, setText] = useState<string>(props.question);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempText, setTempText] = useState<string>("");
  const handleQuestionChange = props.onChange;

  // DBに格納できる文字長であるか判別するために使用
  const [error, setError] = useState("");
  const limitChars = 200;

  const startEditing = () => {
    setTempText(text);
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempText(e.target.value);
    validateInput(e.target.value, limitChars, setError);
  };

  // フォーカスが外れたら編集完了
  const handleBlur = () => {
    setText(tempText);
    handleQuestionChange(tempText);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing || text.trim() === "" ? (
        <div className="flex items-center">
          <textarea
            className="my-form"
            value={tempText}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="例. あなたの強みを教えてください。"
            autoFocus
          />
        </div>
      ) : (
        <div className="" onDoubleClick={startEditing}>
          {text}
        </div>
      )}
      {error && (
        <div className="text-red-500">
          ↑質問は{limitChars}文字以下にしてください
        </div>
      )}
    </>
  );
};

export default QuestionForm;
