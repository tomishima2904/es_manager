import { IconContext } from "react-icons";
import { GrTrash } from "react-icons/gr";

const RemoveFormButton = (props: {
  handleRemoveForm: () => void;
}): JSX.Element => {
  const { handleRemoveForm } = props;

  const onRemoveFormBtnClick = () => {
    handleRemoveForm();
  };

  return (
    <div className="mx-auto flex-none ml-2 ">
      <IconContext.Provider value={{ className: "w-4 h-4" }}>
        <button onClick={onRemoveFormBtnClick} type="button">
          <GrTrash />
        </button>
      </IconContext.Provider>
    </div>
  );
};

export default RemoveFormButton;
