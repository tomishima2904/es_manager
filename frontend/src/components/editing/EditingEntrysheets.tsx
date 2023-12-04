import { EditingEntrysheetsProps } from "@/types/EntrysheetProps";
import EditingEntrysheet from "./EditingEntrysheet";

const EditingEntrysheets = (props: {
  editingEntrysheets: EditingEntrysheetsProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const {
    editingEntrysheets,
    setEditingEntrysheets,
    selectedTab,
    setSelectedTab,
  } = props;

  const handleChange = (selectedTab: string) => setSelectedTab(selectedTab);

  return (
    <div className="flex flex-grow flex-shrink-0 flex-col pl-2 pr-2">
      {/* タブの選択 */}
      <div className="flex">
        {Object.keys(editingEntrysheets).map((key) => (
          <div
            key={key}
            className={`flex-grow flex-shrink-0 px-4 py-2 text-sm cursor-pointer ${
              key === selectedTab
                ? "bg-white border-t border-l border-r border-gray-300 rounded-t-xl"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleChange(key)}
          >
            {editingEntrysheets[Number(key)].company}
          </div>
        ))}
      </div>

      {/* 選択されたキーに対応するエントリーシートを表示 */}
      <div>
        {Object.keys(editingEntrysheets).map((key) => (
          <div key={key} className={key === selectedTab ? "block" : "hidden"}>
            <EditingEntrysheet
              entrysheet={editingEntrysheets[Number(key)]}
              setEditingEntrysheets={setEditingEntrysheets}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditingEntrysheets;
