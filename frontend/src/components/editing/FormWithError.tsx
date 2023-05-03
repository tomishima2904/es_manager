const FormWithError = (props: {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string;
}): JSX.Element => {
  const { text, handleChange, error } = props;
  return (
    <>
      <textarea className="my-form" value={text} onChange={handleChange} />
      {error && <p>{error}</p>}
    </>
  );
};

export default FormWithError;
