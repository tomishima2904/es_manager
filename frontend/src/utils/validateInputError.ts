// inputValue が limitChars より大きいとエラーを出力
const validateInputError = (
  inputValue: string,
  limitChars: number,
  setError: React.Dispatch<React.SetStateAction<string>>
): void => {
  if (inputValue.length > limitChars) {
    const message = { limitChars }.toString() + "文字以下にしてください。";
    setError(message);
  } else {
    setError("");
  }
};

export default validateInputError;
