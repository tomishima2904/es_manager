import { UserIdContext } from "@/pages/users/[userId]/entrysheets";
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
  setSelectedTabs: React.Dispatch<React.SetStateAction<string[]>>;
  setTabOrders: React.Dispatch<React.SetStateAction<string[][]>>;
}): JSX.Element => {
  const {
    setEntrysheets,
    setEditingEntrysheets,
    setSelectedTabs,
    setTabOrders,
  } = props;
  const userId = useContext(UserIdContext);

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
      setTabOrders((prevTabOrders) => {
        const newTabOrders = [...prevTabOrders]; // 前のタブ順序配列をコピー
        newTabOrders[0] = [...prevTabOrders[0], String(newEsId)]; // 0番目のリストに新しい要素を追加
        return newTabOrders; // 新しいタブ順序配列を返す
      });

      // 編集中のタブに選択
      setSelectedTabs((prevSelectedTabs) => {
        const newSelectedTabs = [...prevSelectedTabs]; // 前の選択されたタブ配列をコピー
        newSelectedTabs[0] = String(newEsId); // tabOrderId番目の値を新しい値で置換
        return newSelectedTabs; // 新しい選択されたタブ配列を返す
      });
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
