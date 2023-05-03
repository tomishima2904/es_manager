import type { AnswersProps } from "@/types/EntrysheetProps";
import React from "react";
import { IconContext } from "react-icons";
import { GrFormAdd } from "react-icons/gr";

const AddAnswerButton = (props: {
  answers: AnswersProps;
  setNewProps: (newAnswers: AnswersProps) => void;
}): JSX.Element => {
  const { answers, setNewProps } = props;

  // keyの最大値に+1して新たなキーを作成して、新規質問を追加
  const onAddAnswerBtnClick = () => {
    const maxKey: number = Math.max(
      ...Object.keys(answers).map((aId) => parseInt(aId))
    );
    const newKey: string = (maxKey + 1).toString();
    const newAnswerProps: AnswersProps = { [newKey]: "" };
    setNewProps(newAnswerProps);
  };

  return (
    <div className="mx-auto mt-1">
      <IconContext.Provider value={{ className: "w-6 h-6" }}>
        <button onClick={onAddAnswerBtnClick} type="button">
          <GrFormAdd />
        </button>
      </IconContext.Provider>
    </div>
  );
};

export default AddAnswerButton;
