import { IconContext } from "react-icons";
import { GrTrash } from "react-icons/gr";

const RemoveAnswerButton = (props: {
  handleRemoveAnswer: () => void;
}): JSX.Element => {
  const { handleRemoveAnswer } = props;

  const onRemoveAnswerBtnClick = () => {
    handleRemoveAnswer();
  };

  return (
    <div className="mx-auto flex-none ml-2 ">
      <IconContext.Provider value={{ className: "w-4 h-4" }}>
        <button onClick={onRemoveAnswerBtnClick} type="button">
          <GrTrash />
        </button>
      </IconContext.Provider>
    </div>
  );
};

export default RemoveAnswerButton;
