import axios from "axios";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { AiOutlineFileAdd } from "react-icons/ai"; // 画像icon

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
    const esID: string = response.data.esID.toString();
    const newENDPOINT: string = "user/entrysheets/" + esID;
    // useRouterでnewENDPOINTへ画面遷移
    const router = useRouter();
    router.push({ pathname: newENDPOINT });
  } catch (error) {
    console.error("Error", error);
  }
};

export default function CreateButton() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6" }}>
      <button
        className="flex flex-shrink-0 justify-center items-center
        rounded-lg border shadow-2xl drop-shadow-md
        text-lg px-4 py-2 h-10"
        onClick={createNewEntrysheet}
      >
        <AiOutlineFileAdd className="mr-2" />
        <span>作成</span>
      </button>
    </IconContext.Provider>
  );
}
