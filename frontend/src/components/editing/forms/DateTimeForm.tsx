import { useState } from "react";

const DateTimeForm = (props: {
  datetime: string;
  className_: string;
  onChange: (text: string) => void;
}): JSX.Element => {
  const [datetime, setDatetime] = useState<string>(props.datetime);
  const className_ = props.className_;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatetime(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <input
      type="datetime-local"
      className={className_}
      value={datetime}
      onChange={handleChange}
      autoFocus
    />
  );
};

export default DateTimeForm;
