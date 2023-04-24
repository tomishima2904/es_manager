import CreateButton from "./CreateButton";

const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-1/6 bg-white flex-none rounded-lg p-4 mr-4">
      <CreateButton />
    </aside>
  );
};

export default Sidebar;
