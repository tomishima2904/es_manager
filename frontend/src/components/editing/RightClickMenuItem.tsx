// 右クリックした時に開かれるメニューのアイテムのスタイル
const RightClickMenuItem = (props: {
  labelText: string;
  handleClick: () => void;
}): JSX.Element => {
  return (
    <li
      className="flex items-center px-4 py-2 border-b border-gray-300 bg-white
        transition duration-300 ease-in-out hover:bg-gray-100"
      onClick={props.handleClick}
    >
      {props.labelText}
    </li>
  );
};

export default RightClickMenuItem;
