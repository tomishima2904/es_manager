import QuestionForm from "./forms/QuestionForm";
import AnswerForms from "./forms/AnswerForms";
import type { QandAProps } from "@/types/EntrysheetProps";

const QandA = (props: { qAndAProps: QandAProps }) => {
  const { question, maxChars, answers } = props.qAndAProps;

  return (
    <form className="p-4 flex-grow border-b border-gray-300">
      <QuestionForm question={question} />
      <AnswerForms answers={answers} maxChars={maxChars} />
    </form>
  );
};

export default QandA;
