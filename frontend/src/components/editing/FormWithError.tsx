const FormWithError = (props: {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string;
  placeholder: string;
}): JSX.Element => {
  const { text, handleChange, error, placeholder } = props;
  return (
    <>
      <textarea
        className="my-form"
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && <p>{error}</p>}
    </>
  );
};

export default FormWithError;
