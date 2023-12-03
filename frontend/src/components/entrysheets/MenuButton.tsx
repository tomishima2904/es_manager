import { IconContext } from "react-icons";
import { IoMdMenu } from "react-icons/io";

const MenuButton = ({ onClick }: { onClick: () => void }): JSX.Element => {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6" }}>
      <button onClick={onClick}>
        <IoMdMenu className="mr-2" />
      </button>
    </IconContext.Provider>
  );
};

export default MenuButton;
