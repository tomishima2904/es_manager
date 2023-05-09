const FormWithError = (props: {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isOver: boolean;
  error: string;
  placeholder: string;
}): JSX.Element => {
  const { text, handleChange, isOver, error, placeholder } = props;
  return (
    <>
      <textarea
        className={isOver ? "my-form-warning" : "my-form"}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 p-1">{error}</p>}
    </>
  );
};

export default FormWithError;
