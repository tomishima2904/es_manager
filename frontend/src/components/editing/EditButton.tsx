import { BiEdit, BiCheck } from "react-icons/bi";

const EditButton = (props: {
  isEditing: boolean;
  onClick: () => void;
}): JSX.Element => {
  return (
    <button onClick={props.onClick} type="button">
      {props.isEditing ? <BiCheck /> : <BiEdit />}
    </button>
  );
};

export default EditButton;
