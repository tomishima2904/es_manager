import type {
  EditingEntrysheetsProps,
  EntrysheetsProps,
  QuestionsProps,
} from "@/types/EntrysheetProps";
import { useEffect, useState } from "react";
import Header from "./Header";
import QuestionArea from "./QuestionArea";
import AddQuestionButton from "./buttons/AddQestionButton";

const EditingEntrysheet = (props: {
  esId: number;
  entrysheets: EntrysheetsProps;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  editingEntrysheets: EditingEntrysheetsProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const {
    esId,
    entrysheets,
    setEntrysheets,
    editingEntrysheets,
    setEditingEntrysheets,
  } = props;
  const [numQuestions, setNumQuestions] = useState<number>(0);

  useEffect(() => {
    setNumQuestions(Object.keys(editingEntrysheets[esId]).length);
  }, [editingEntrysheets, esId, entrysheets]);

  if (!editingEntrysheets || !entrysheets || !esId) {
    return <div>Loading...</div>;
  }

  // 質問追加時にステートの状態を変更する関数
  const handleAddQandAs = (newQuestionProps: QuestionsProps) => {
    setEditingEntrysheets(
      (prevEditingEntrysheets: EditingEntrysheetsProps) => ({
        ...prevEditingEntrysheets,
        [esId]: {
          ...prevEditingEntrysheets[esId],
          ...newQuestionProps,
        },
      })
    );
    setNumQuestions((prev) => prev + 1);
  };

  return (
    <div className="p-4 flex flex-col ">
      <Header
        esId={esId}
        entrysheets={entrysheets}
        setEntrysheets={setEntrysheets}
        editingEntrysheets={editingEntrysheets}
      />
      {Object.keys(editingEntrysheets[esId]).map((qId) => (
        <QuestionArea
          key={qId}
          esId={esId}
          qId={qId}
          qAndAProps={editingEntrysheets[esId][qId]}
          setEditingEntrysheets={setEditingEntrysheets}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
        />
      ))}
      <AddQuestionButton
        questions={editingEntrysheets[esId]}
        setNewProps={handleAddQandAs}
      />
    </div>
  );
};

export default EditingEntrysheet;
