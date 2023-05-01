import QuestionForm from "./QuestionForm";
import AnswerForms from "./AnswerForms";
import type { QandAProps } from "@/types/EntrysheetProps";

const QandA = (props: { qAndAProps: QandAProps }) => {
  const { question, maxChars, answers } = props.qAndAProps;

  return (
    <form>
      <QuestionForm question={question} />
      <AnswerForms answers={answers} maxChars={maxChars} />
    </form>
  );
};

export default QandA;
