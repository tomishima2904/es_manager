const SetCharsForm = (props: {
  maxChars: number;
  setMaxChars: (value: number) => void;
}): JSX.Element => {
  const { maxChars } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setMaxChars(parseInt(e.target.value));
  };
  return (
    <input
      type="number"
      maxLength={4}
      value={maxChars}
      className="my-number-form"
      onChange={handleChange}
    />
  );
};

export default SetCharsForm;
