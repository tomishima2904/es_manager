import { useState } from "react";

const DoubleClickForm = (props: {
  text: string;
  classNames: string[];
}): JSX.Element => {
  const [text, setText] = useState<string>(props.text);
  const [editing, setEditing] = useState<boolean>(false);
  const [tempText, setTempText] = useState<string>("");
  const [className1, className2] = props.classNames;

  const startEditing = () => {
    setTempText(text);
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(e.target.value);
  };

  // フォーカスが外れたら編集完了
  const handleBlur = () => {
    setText(tempText);
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <input
          type="text"
          className={className1}
          value={tempText}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <>
          <div className={className2} onDoubleClick={startEditing}>
            {text}
          </div>
        </>
      )}
    </>
  );
};

export default DoubleClickForm;
