import axios from "axios";
import type { NextRouter } from "next/router";
import { IconContext } from "react-icons";
import { AiOutlineFileAdd } from "react-icons/ai"; // 画像icon

export default function CreateEntrysheetButton(props: { router: NextRouter }) {
  // POSTメソッドで新しいエントリーシートを作成
  const createNewEntrysheet = async () => {
    const ENDPOINT: string = "/api/user/entrysheets";
    try {
      const response = await axios.post(
        ENDPOINT,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Success", response);
      // レスポンスオブジェクトから新しく作成されたリソースのIDを取得
      const esId: string = response.data.esId.toString();
      const newENDPOINT: string = "entrysheets/" + esId;
      // useRouterでnewENDPOINTへ画面遷移
      const { router } = props;
      router.push({ pathname: newENDPOINT });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <IconContext.Provider value={{ className: "w-6 h-6" }}>
      <button
        className="flex flex-shrink-0 justify-center items-center
        rounded-lg border shadow-2xl drop-shadow-md
        hover:bg-gray-100 transition duration-300 ease-in-out
        text-lg px-4 py-2 h-10"
        onClick={createNewEntrysheet}
      >
        <AiOutlineFileAdd className="mr-2" />
        <span>作成</span>
      </button>
    </IconContext.Provider>
  );
}
