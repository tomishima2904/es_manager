import type {
  EditingEntrysheetsProps,
  QuestionsProps,
  RichEntrysheetProps,
} from "@/types/EntrysheetProps";
import { useEffect, useState } from "react";
import Header from "./Header";
import QuestionArea from "./QuestionArea";
import AddQuestionButton from "./buttons/AddQestionButton";

const EditingEntrysheet = (props: {
  entrysheet: RichEntrysheetProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const { entrysheet, setEditingEntrysheets } = props;
  const esId = entrysheet.esId;
  const [numQuestions, setNumQuestions] = useState<number>(
    Object.keys(entrysheet.questions).length
  );

  useEffect(() => {
    setNumQuestions(Object.keys(entrysheet.questions).length);
  }, [entrysheet]);

  if (!entrysheet) {
    return <div>Loading...</div>;
  }

  // 質問追加時にステートの状態を変更する関数
  const handleAddQandAs = (newQuestionProps: QuestionsProps) => {
    setEditingEntrysheets(
      (prevEditingEntrysheets: EditingEntrysheetsProps) => ({
        ...prevEditingEntrysheets,
        [esId]: {
          ...prevEditingEntrysheets[esId],
          questions: {
            ...prevEditingEntrysheets[esId].questions,
            ...newQuestionProps,
          },
        },
      })
    );
    setNumQuestions((prev) => prev + 1);
  };

  return (
    <div className="p-4 flex flex-col ">
      <Header
        esId={entrysheet.esId}
        company={entrysheet.company}
        job={entrysheet.job}
        event={entrysheet.event}
        deadline={entrysheet.deadline}
        entrysheet={entrysheet}
        setEditingEntrysheets={setEditingEntrysheets}
      />
      {Object.keys(entrysheet.questions).map((qId) => (
        <QuestionArea
          key={qId}
          esId={esId}
          qId={qId}
          qAndAProps={entrysheet.questions[qId]}
          setEditingEntrysheets={setEditingEntrysheets}
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
