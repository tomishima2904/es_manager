import {
  EditingEntrysheetsProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import EditingEntrysheets from "./EditingEntrysheets";

const EditingEntrysheetsViewsManager = (props: {
  entrysheets: EntrysheetsProps;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  editingEntrysheets: EditingEntrysheetsProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  selectedTabs: string[];
  setSelectedTabs: React.Dispatch<React.SetStateAction<string[]>>;
  tabOrders: string[][];
  setTabOrders: React.Dispatch<React.SetStateAction<string[][]>>;
}): JSX.Element => {
  const {
    entrysheets, // companyやevent等の情報
    setEntrysheets,
    editingEntrysheets, // 個々のES内の質問と解答の情報
    setEditingEntrysheets,
    selectedTabs,
    setSelectedTabs,
    tabOrders,
    setTabOrders,
  } = props;
  return (
    <div className="flex ml-16 pl-2">
      {/* HACK: サイドバーとのマージンの取り方が無理矢理 */}
      {tabOrders.map(
        (tabOrder, index) =>
          tabOrder.length > 0 && (
            <div className="flex-1 border-l border-gray-300" key={index}>
              <EditingEntrysheets
                entrysheets={entrysheets}
                setEntrysheets={setEntrysheets}
                editingEntrysheets={editingEntrysheets}
                setEditingEntrysheets={setEditingEntrysheets}
                selectedTab={selectedTabs[index]}
                setSelectedTabs={setSelectedTabs}
                tabOrder={tabOrder}
                setTabOrders={setTabOrders}
                viewId={index}
              />
            </div>
          )
      )}
    </div>
  );
};

export default EditingEntrysheetsViewsManager;
