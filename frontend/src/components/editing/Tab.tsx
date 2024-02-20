import { EditingEntrysheetsProps } from "@/types/EntrysheetProps";
import { useEffect, useRef, useState } from "react";
import RightClickMenuItem from "./RightClickMenuItem";
import TabCloseButton from "./buttons/TabCloseButton";

const Tab = (props: {
  esId: string;
  selectedTab: string;
  company: string;
  onHandleChange: (selectedTab: string) => void; // 選択中のタブを切り替える関数
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >; // `TabCloseButton`で使用
  setTabOrders: React.Dispatch<React.SetStateAction<string[][]>>; // `TabCloseButton`で使用
  viewId: number; // `TabCloseButton`で使用
}): JSX.Element => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const menuRef = useRef<HTMLUListElement>(null); // Ref for the menu element

  // メニューが開かれているときに，メニュー領域外をクリックするとメニューを閉じるようにする
  useEffect(() => {
    // Add event listener to detect clicks outside the menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // If menu is open and clicked outside the menu
        setMenuVisible(false); // Close menu
      }
    };

    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]); // Run this effect whenever menuVisible changes

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default right-click behavior
    setMenuPosition({ top: event.clientY, left: event.clientX }); // Set menu position
    setMenuVisible(true); // Show menu
  };

  const closeMenu = () => {
    setMenuVisible(false); // Hide menu
  };

  const splitView = () => {
    // クリックしたタブがない方のビューにESを表示
    props.setTabOrders((prevTabOrders) => {
      const newTabOrders = [...prevTabOrders];
      const theOtherViewId = ~props.viewId & 1;
      // 開いている方のタブを閉じる
      newTabOrders[props.viewId] = prevTabOrders[props.viewId].filter(
        (tab) => tab !== String(props.esId)
      );
      // 他方の画面に編集画面を移す
      newTabOrders[theOtherViewId] = [
        ...prevTabOrders[theOtherViewId],
        props.esId,
      ];
      return newTabOrders;
    });
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
        <div className="flex-none rounded-md">
          {menuVisible && (
            <ul
              ref={menuRef} // Assign ref to the menu element
              className="absolute z-10 bg-white border border-gray-300 rounded shadow"
            >
              <RightClickMenuItem
                labelText="メニューを閉じる"
                handleClick={closeMenu}
              />
              <RightClickMenuItem
                labelText="分割して開く"
                handleClick={splitView}
              />
            </ul>
          )}
          <TabCloseButton
            esId={Number(props.esId)}
            setEditingEntrysheets={props.setEditingEntrysheets}
            setTabOrders={props.setTabOrders}
            viewId={props.viewId}
          />
        </div>
      </div>
    </div>
  );
};

export default Tab;
