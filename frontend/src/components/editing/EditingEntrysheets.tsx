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
    <div className="flex flex-col p-2">
      <label htmlFor="tabs" className="sr-only"></label>
      <select
        id="tabs"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => handleChange(e.target.value)}
      >
        {Object.keys(editingEntrysheets).map((key) => (
          <option key={key} value={key}>
            {editingEntrysheets[Number(key)].company}
          </option>
        ))}
      </select>

      {/* 選択されたキーに対応するエントリーシートを表示 */}
      <div>
        {Object.keys(editingEntrysheets).map((key) => (
          <div key={key} className={key === selectedKey ? "block" : "hidden"}>
            <EditingEntrysheet
              key={key}
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
