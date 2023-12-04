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
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const { entrysheets, setEntrysheets, setEditingEntrysheets, setSelectedTab } =
    props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {isSidebarOpen ? (
        <aside
          className={`w-1/3 bg-blue-100 flex-none p-4 mr-4 flex flex-col border-r border-gray-300`}
        >
          <div className="flex justify-start items-start pl-4 pb-2 gap-4">
            <MenuButton onClick={toggleSidebar} />
            <CreateEntrysheetButton
              setEntrysheets={setEntrysheets}
              setSelectedTab={setSelectedTab}
            />
          </div>
          <EntrysheetsList
            entrysheets={entrysheets}
            setEditingEntrysheets={setEditingEntrysheets}
            setSelectedTab={setSelectedTab}
          />
        </aside>
      ) : (
        <div className="pl-8 p-4 flex items-start bg-blue-100">
          <MenuButton onClick={toggleSidebar} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
