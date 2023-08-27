import type {
  QuestionsProps,
  RichEntrysheetProps,
} from "@/types/EntrysheetProps";
import { useEffect, useState } from "react";
import Header from "./Header";
import QuestionArea from "./QuestionArea";
import AddQuestionButton from "./buttons/AddQestionButton";

const EditingEntrysheet = (props: {
  entrysheet: RichEntrysheetProps;
}): JSX.Element => {
  const { userId, esId, company, job, event, deadline, questions } =
    props.entrysheet;
  const [entrysheet, setEntrysheet] = useState<RichEntrysheetProps>({
    userId: userId,
    esId: esId,
    company: company,
    job: job,
    event: event,
    deadline: deadline,
    questions: {},
  });
  const [numQuestions, setNumQuestions] = useState<number>(
    Object.keys(questions).length
  );

  useEffect(() => {
    setEntrysheet({
      userId: userId,
      esId: esId,
      company: company,
      job: job,
      event: event,
      deadline: deadline,
      questions: { ...questions },
    });
    setNumQuestions(Object.keys(questions).length);
  }, [userId, esId, company, job, event, deadline, questions]);

  if (!entrysheet) {
    return <div>Loading...</div>;
  }

  // 質問追加時にステートの状態を変更する関数
  const handleAddQandAs = (newQuestionProps: QuestionsProps) => {
    setEntrysheet((prevEntrysheet) => ({
      ...prevEntrysheet,
      questions: {
        ...prevEntrysheet.questions,
        ...newQuestionProps,
      },
    }));
    setNumQuestions((prev) => prev + 1);
  };

  return (
    <div className="p-4 flex flex-col ">
      <Header
        company={company}
        job={job}
        event={event}
        entrysheet={entrysheet}
        setEntrysheet={setEntrysheet}
      />
      {Object.keys(entrysheet.questions).map((qId) => (
        <QuestionArea
          key={qId}
          qId={qId}
          qAndAProps={entrysheet.questions[qId]}
          setEntrysheet={setEntrysheet}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
        />
      ))}
      <AddQuestionButton
        questions={entrysheet.questions}
        setNewProps={handleAddQandAs}
      />
    </div>
  );
};

export default EditingEntrysheet;
