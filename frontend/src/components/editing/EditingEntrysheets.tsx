import { EditingEntrysheetsProps } from "@/types/EntrysheetProps";
import { useState } from "react";
import EditingEntrysheet from "./EditingEntrysheet";

const EditingEntrysheets = (props: {
  editingEntrysheets: EditingEntrysheetsProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const { editingEntrysheets, setEditingEntrysheets } = props;
  const [selectedKey, setSelectedKey] = useState<string>("");

  const handleChange = (selectedKey: string) => setSelectedKey(selectedKey);

  return (
    <div className="flex flex-col pl-2 pr-2">
      {/* タブの選択 */}
      <div className="flex">
        {Object.keys(editingEntrysheets).map((key) => (
          <div
            key={key}
            className={`flex-shrink-0 px-4 py-2 cursor-pointer ${
              key === selectedKey
                ? "bg-white border-t border-l border-r border-gray-300 rounded-t-xl"
                : "bg-gray-100 hover:bg-gray-200 rounded-t-xl"
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
          <div key={key} className={key === selectedKey ? "block" : "hidden"}>
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
