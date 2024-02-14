import {
  EditingEntrysheetsProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import EditingEntrysheet from "./EditingEntrysheet";
import TabCloseButton from "./buttons/TabCloseButton";

const EditingEntrysheets = (props: {
  entrysheets: EntrysheetsProps;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  editingEntrysheets: EditingEntrysheetsProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  tabOrder: string[];
  setTabOrder: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element => {
  const {
    entrysheets, // companyやevent等の情報
    setEntrysheets,
    editingEntrysheets, // 個々のES内の質問と解答の情報
    setEditingEntrysheets,
    selectedTab,
    setSelectedTab,
    tabOrder,
    setTabOrder,
  } = props;

  const handleChange = (selectedTab: string) => setSelectedTab(selectedTab);

  return (
    <div className="flex flex-grow flex-shrink-0 flex-col pl-2 pr-2 ml-16">
      {/* タブの選択 */}
      <div className="flex">
        {tabOrder.map((order, index) => (
          <div
            key={order}
            className={`flex-grow max-w-xs flex-shrink-0 px-4 py-2 text-sm cursor-pointer ${
              order === selectedTab
                ? "bg-white border-t border-l border-r border-gray-300 rounded-t-xl"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleChange(order)}
          >
            <div className="flex justify-between">
              <div className="">{entrysheets[Number(order)].company}</div>
              <div className="flex-none">
                <TabCloseButton
                  esId={Number(order)}
                  setEditingEntrysheets={setEditingEntrysheets}
                  setTabOrder={setTabOrder}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 選択されたキーに対応するエントリーシートを表示 */}
      <div>
        {tabOrder.map((order, index) => (
          <div
            key={order}
            className={order === selectedTab ? "block" : "hidden"}
          >
            <EditingEntrysheet
              esId={Number(order)}
              entrysheets={entrysheets}
              setEntrysheets={setEntrysheets}
              editingEntrysheets={editingEntrysheets}
              setEditingEntrysheets={setEditingEntrysheets}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditingEntrysheets;
