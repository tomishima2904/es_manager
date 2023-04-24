import CreateButton from "./CreateButton";
import type { NextRouter } from "next/router";

const Sidebar = (props: { router: NextRouter }): JSX.Element => {
  const { router } = props;
  return (
    <aside
      className="w-1/6 bg-white flex-none rounded-lg p-4 mr-4
      flex justify-center "
    >
      <CreateButton router={router} />
    </aside>
  );
};

export default Sidebar;
