import {
  SetSelectedTabContext,
  SetTabOrderContext,
  UserIdContext,
} from "@/pages/users/[userId]/entrysheets";
import {
  EditingEntrysheetsProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import axios from "axios";
import { useContext } from "react";
import { IconContext } from "react-icons";
import { AiOutlineFileAdd } from "react-icons/ai"; // 画像icon

const CreateEntrysheetButton = (props: {
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const { setEntrysheets, setEditingEntrysheets } = props;
  const userId = useContext(UserIdContext);
  const setSelectedTab = useContext(SetSelectedTabContext);
  const setTabOrder = useContext(SetTabOrderContext);

  // POSTメソッドで新しいエントリーシートを作成
  const createNewEntrysheet = async () => {
    const url: string = `${process.env.API_HOST}/users/${userId}/entrysheets`;
    try {
      const postResponse = await axios.post(
        url,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Success", postResponse);

      // 新しく作成されたエントリーシートのesIdを取得
      const newEsId = String(postResponse.data.esId);

      // 新規作成されたリソースを追加
      setEntrysheets((prevEntrysheets: EntrysheetsProps) => ({
        ...prevEntrysheets,
        [newEsId]: { ...postResponse.data },
      }));

      // 新しく作成されたエントリーシートのデータをGETメソッドでフェッチ
      const getUrl: string = `${url}/${newEsId}`;
      const getResponse = await axios.get(getUrl);

      // 編集中のESオブジェクトに追加
      setEditingEntrysheets(
        (prevEditingEntrysheets: EditingEntrysheetsProps) => ({
          ...prevEditingEntrysheets,
          [newEsId]: { ...getResponse.data.questions },
        })
      );

      // タブ順序配列にも追加
      setTabOrder((prevTabOrder) => {
        const newTabOrder = [...prevTabOrder, String(newEsId)];
        return newTabOrder;
      });

      // 編集中のタブに選択
      setSelectedTab(String(newEsId));
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
