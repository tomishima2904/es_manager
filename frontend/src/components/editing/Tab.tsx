import { EditingEntrysheetsProps } from "@/types/EntrysheetProps";
import { useState } from "react";
import TabCloseButton from "./buttons/TabCloseButton";

const Tab = (props: {
  esId: string;
  selectedTab: string;
  company: string;
  onHandleChange: (selectedTab: string) => void; // 選択中のタブを切り替える関数
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >; // `TabCloseButton`で使用
  setTabOrder: React.Dispatch<React.SetStateAction<string[]>>; // `TabCloseButton`で使用
}): JSX.Element => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default right-click behavior
    setMenuPosition({ top: event.clientY, left: event.clientX }); // Set menu position
    setMenuVisible(true); // Show menu
  };

  const closeMenu = () => {
    setMenuVisible(false); // Hide menu
  };

  return (
    <div
      className={`flex-grow max-w-xs flex-shrink-0 px-4 py-2 text-sm cursor-pointer ${
        props.esId === props.selectedTab
          ? "bg-white border-l border-r border-gray-300 border-t-2 border-t-green-300"
          : "bg-gray-100 hover:bg-gray-200 border-r"
      }`}
      onClick={() => props.onHandleChange(props.esId)}
      onContextMenu={handleRightClick} // Handle right-click event
    >
      <div className="flex justify-between">
        <div className="">{props.company}</div>
        <div className="flex-none">
          {menuVisible && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded shadow">
              <button onClick={closeMenu}>Close Menu</button>
              {/* <TabRightClickMenu esId={props.esId} /> */}
            </div>
          )}
          <TabCloseButton
            esId={Number(props.esId)}
            setEditingEntrysheets={props.setEditingEntrysheets}
            setTabOrder={props.setTabOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Tab;
