import type { QuestionsProps } from "@/types/EntrysheetProps";
import { IconContext } from "react-icons";
import { GrAdd } from "react-icons/gr";

const AddQuestionButton = (props: {
  questions: QuestionsProps;
  setNewProps: (newQuestions: QuestionsProps) => void;
}) => {
  const { questions, setNewProps } = props;

  // keyの最大値に+1して新たなキーを作成して、新規質問を追加
  const onAddQandAsBtnClick = () => {
    const maxKey: number = Math.max(
      ...Object.keys(questions).map((qId) => parseInt(qId))
    );
    const newKey: string = (maxKey + 1).toString();
    const newQuestionProps: QuestionsProps = {
      [newKey]: {
        question: "",
        maxChars: 100,
        answers: { "0": "" },
      },
    };
    setNewProps(newQuestionProps);
  };

  return (
    <div className="mx-auto mt-4">
      <IconContext.Provider value={{ className: "w-6 h-6" }}>
        <button
          className="flex flex-shrink-0 justify-center items-center
        rounded-lg border shadow-2xl drop-shadow-md bg-white
        hover:bg-gray-100 transition duration-300 ease-in-out
        text-lg px-4 py-2 h-10"
          onClick={onAddQandAsBtnClick}
        >
          <GrAdd className="mr-2" />
          <span>新規質問追加</span>
        </button>
      </IconContext.Provider>
    </div>
  );
};

export default AddQuestionButton;
