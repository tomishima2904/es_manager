import { useState } from "react";

const DateTimeForm = (props: {
  datetime: string;
  className_: string;
  onChange: (text: string) => void;
}): JSX.Element => {
  const [datetime, setDatetime] = useState<string>(props.datetime);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempText, setTempText] = useState<string>("");
  const className_ = props.className_;

  const startEditing = () => {
    setTempText(datetime);
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(e.target.value);
  };

  // フォーカスが外れたら編集完了
  const handleBlur = () => {
    setDatetime(tempText);
    setIsEditing(false);
    props.onChange(tempText); // entrysheetにtextを反映させる
  };

  return (
    <input
      type="datetime-local"
      className={className_}
      value={datetime}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
    />
  );
};

export default DateTimeForm;
