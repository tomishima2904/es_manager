import {
  EditingEntrysheetsProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import { useState } from "react";
import CreateEntrysheetButton from "./CreateEentrysheetButton";
import EntrysheetsList from "./EntrysheetsList";
import MenuButton from "./MenuButton";

const Sidebar = (props: {
  entrysheets: EntrysheetsProps;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  setSelectedTabs: React.Dispatch<React.SetStateAction<string[]>>;
  setTabOrders: React.Dispatch<React.SetStateAction<string[][]>>;
}): JSX.Element => {
  const {
    entrysheets,
    setEntrysheets,
    setEditingEntrysheets,
    setSelectedTabs,
    setTabOrders,
  } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {isSidebarOpen ? (
        <aside
          className={`w-1/3 bg-blue-100 flex-none p-4 mr-4 flex flex-col border-r border-gray-300 z-50 fixed h-full`}
        >
          <div className="flex justify-start items-start pl-4 pb-2 gap-4">
            <MenuButton onClick={toggleSidebar} />
            <CreateEntrysheetButton
              setEntrysheets={setEntrysheets}
              setEditingEntrysheets={setEditingEntrysheets}
              setSelectedTabs={setSelectedTabs}
              setTabOrders={setTabOrders}
            />
          </div>
          <EntrysheetsList
            entrysheets={entrysheets}
            setEditingEntrysheets={setEditingEntrysheets}
            setSelectedTabs={setSelectedTabs}
            setTabOrders={setTabOrders}
          />
        </aside>
      ) : (
        <div className="pl-8 p-4 flex-none items-start bg-blue-100 z-50 fixed h-full">
          <MenuButton onClick={toggleSidebar} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
