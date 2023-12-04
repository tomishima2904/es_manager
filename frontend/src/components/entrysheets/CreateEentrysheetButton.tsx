import { UserIdContext } from "@/pages/users/[userId]/entrysheets";
import { EntrysheetsProps } from "@/types/EntrysheetProps";
import axios from "axios";
import { useContext } from "react";
import { IconContext } from "react-icons";
import { AiOutlineFileAdd } from "react-icons/ai"; // 画像icon

const CreateEntrysheetButton = (props: {
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const { setEntrysheets, setSelectedTab } = props;
  const userId = useContext(UserIdContext);

  // POSTメソッドで新しいエントリーシートを作成
  const createNewEntrysheet = async () => {
    const url: string = `${process.env.API_HOST}/users/${userId}/entrysheets`;
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Success", response);

      // 新規作成されたリソースを追加
      setEntrysheets((prevEntrySheets) => ({
        ...prevEntrySheets,
        entrysheets: [...prevEntrySheets.entrysheets, { ...response.data }],
      }));
      setSelectedTab(String(response.data.esId));
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <IconContext.Provider value={{ className: "w-6 h-6" }}>
      <button
        className="flex flex-shrink-0 justify-center items-center
        rounded-lg border shadow-2xl drop-shadow-md bg-white
        hover:bg-gray-100 transition duration-300 ease-in-out
        text-lg px-4 py-2 h-10"
        onClick={createNewEntrysheet}
      >
        <AiOutlineFileAdd className="mr-2" />
        <span>作成</span>
      </button>
    </IconContext.Provider>
  );
};

export default CreateEntrysheetButton;
