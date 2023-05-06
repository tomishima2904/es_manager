import QuestionForm from "./forms/QuestionForm";
import SetCharsForm from "./forms/SetCharsForm";
import AnswerForms from "./forms/AnswerForms";
import type { QandAProps, AnswersProps } from "@/types/EntrysheetProps";
import { useState } from "react";

const QandA = (props: { qAndAProps: QandAProps }) => {
  const question: string = props.qAndAProps.question;
  const answers: AnswersProps = props.qAndAProps.answers;
  const [maxChars, setMaxChars] = useState<number>(props.qAndAProps.maxChars);

  return (
    <form className="p-4 flex-grow justify-between border-b border-gray-300">
      <div className="flex w-full">
        <div className="w-11/12">
          <QuestionForm question={question} />
        </div>
        <div className="w-1/12 ml-2">
          <SetCharsForm maxChars={maxChars} setMaxChars={setMaxChars} />
        </div>
      </div>
      <AnswerForms answers={answers} maxChars={maxChars} />
    </form>
  );
};

export default QandA;
