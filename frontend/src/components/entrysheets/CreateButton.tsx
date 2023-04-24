import axios from "axios";
import { useRouter } from "next/router";

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
    <button
      className="rounded-full drop-shadow-2xl border"
      onClick={createNewEntrysheet}
    >
      新規作成
    </button>
  );
}
