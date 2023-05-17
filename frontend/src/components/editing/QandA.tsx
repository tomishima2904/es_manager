import QuestionForm from "./forms/QuestionForm";
import SetCharsForm from "./forms/SetCharsForm";
import AnswerForms from "./forms/AnswerForms";
import type {
  QandAProps,
  AnswersProps,
  RichEntrysheetProps,
} from "@/types/EntrysheetProps";
import { useState } from "react";

const QandA = (props: {
  qId: string;
  qAndAProps: QandAProps;
  setEntrysheet: React.Dispatch<React.SetStateAction<RichEntrysheetProps>>;
}) => {
  const { qId, qAndAProps, setEntrysheet } = props;
  const question: string = qAndAProps.question;
  const answers: AnswersProps = qAndAProps.answers;

  // answersコンポーネントに最大字数を共有するためのuseState
  const [maxChars, setMaxChars] = useState<number>(qAndAProps.maxChars);

  // EditingEntrysheetのentrysheetに変更を反映させる
  const handleQuestionChange = (text: string): void => {
    setEntrysheet((prevEntrySheet: RichEntrysheetProps) => ({
      ...prevEntrySheet,
      questions: {
        ...prevEntrySheet.questions,
        [qId]: {
          ...prevEntrySheet.questions[qId],
          question: text,
        },
      },
    }));
  };

  // EditingEntrysheetのentrysheetに変更を反映させる
  const handleMaxCharsChange = (chars: number): void => {
    setEntrysheet((prevEntrySheet: RichEntrysheetProps) => ({
      ...prevEntrySheet,
      questions: {
        ...prevEntrySheet.questions,
        [qId]: {
          ...prevEntrySheet.questions[qId],
          maxChars: chars,
        },
      },
    }));
  };

  return (
    <form className="p-4 flex-grow justify-between border-b border-gray-300">
      <div className="flex w-full">
        <div className="w-10/12">
          <QuestionForm question={question} onChange={handleQuestionChange} />
        </div>
        <div className="ml-2 flex items-center flex-shrink-0 flex-grow-0 justify-self-end">
          <SetCharsForm
            maxChars={maxChars}
            setMaxChars={setMaxChars}
            handleMaxCharsChange={handleMaxCharsChange}
          />
          <div className="ml-0.5">字以内</div>
        </div>
      </div>
      <AnswerForms answers={answers} maxChars={maxChars} />
    </form>
  );
};

export default QandA;
