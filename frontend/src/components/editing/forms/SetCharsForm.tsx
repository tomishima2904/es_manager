const SetCharsForm = (props: {
  maxChars: number;
  setMaxChars: (value: number) => void;
  handleMaxCharsChange: (chars: number) => void;
}): JSX.Element => {
  const { maxChars, setMaxChars, handleMaxCharsChange } = props;

  // TODO: NaN対策
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chars = parseInt(e.target.value);
    setMaxChars(chars);
    handleMaxCharsChange(chars);
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
