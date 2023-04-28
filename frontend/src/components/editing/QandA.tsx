import QuestionForm from "./QuestionForm";
import type { QandAProps } from "@/types/EntrysheetProps";

const QandA = (props: { qAndAProps: QandAProps }) => {
  const { question, maxChars, answers } = props.qAndAProps;

  return (
    <form>
      <QuestionForm question={question} />
    </form>
  );
};

export default QandA;
