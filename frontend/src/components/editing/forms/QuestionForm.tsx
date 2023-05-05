import { useState } from "react";
import validateInput from "@/utils/validateInputError";
import EditButton from "../buttons/EditButton";
import FormWithError from "./FormWithError";

const QuestionForm = (props: { question: string }): JSX.Element => {
  const [text, setText] = useState<string>(props.question);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempText, setTempText] = useState<string>("");
  const limitChars = 100; // DBで格納できる最大の文字長

  const startEditing = () => {
    setTempText(text);
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempText(e.target.value);
  };

  // フォーカスが外れたら編集完了
  const handleBlur = () => {
    setText(tempText);
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
    </>
  );
};

export default QuestionForm;
