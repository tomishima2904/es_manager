import { EditingEntrysheetsProps } from "@/types/EntrysheetProps";
import { IconContext } from "react-icons";
import { MdClear } from "react-icons/md";

const TabCloseButton = (props: {
  esId: number;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  setTabOrder: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element => {
  const { esId, setEditingEntrysheets, setTabOrder } = props;

  const handleClick = () => {
    setEditingEntrysheets((prevEditingEntrysheets: EditingEntrysheetsProps) => {
      // esIdに対応するエントリを削除
      const { [esId]: removedEntry, ...updatedEntries } =
        prevEditingEntrysheets;
      return updatedEntries;
    });
    // タブ順序配列からも削除
    setTabOrder((prevTabOrder) => {
      const newTabOrder = prevTabOrder.filter((tab) => tab !== String(esId));
      return newTabOrder;
    });
  };

  return (
    <div>
      <IconContext.Provider value={{ className: "h-full" }}>
        <button
          type="button"
          onClick={handleClick}
          className="hover:bg-gray-300 p-0.5 rounded-full"
        >
          <MdClear />
        </button>
      </IconContext.Provider>
    </div>
  );
};

export default TabCloseButton;
