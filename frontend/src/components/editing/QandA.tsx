import QuestionForm from "./QuestionForm";
import type { QandAProps } from "@/types/EntrysheetProps";

const QandA = (props: { qAndAProps: QandAProps }) => {
  const { question, max_chars, answers } = props.qAndAProps;

  return (
    <form>
      <QuestionForm question={question} />
    </form>
  );
};

export default QandA;
