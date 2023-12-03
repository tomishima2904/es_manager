import Sidebar from "@/components/entrysheets/Sidebar";
import { EntrysheetsProps } from "@/types/EntrysheetProps";
import fetcher from "@/utils/fetcher";
import { GetServerSidePropsContext } from "next";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

// 動的なパスの値を取得
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: { query },
  };
}

export const UserIdContext = createContext<
  string | string[] | undefined | null
>(null);

const Entrysheets = ({ query }: GetServerSidePropsContext) => {
  // SWR で データフェッチ
  const url: string = `${process.env.API_HOST}/users/${query.userId}/entrysheets`;
  const { data: entrysheets, error } = useSWR(url, fetcher);

  // ローカルのReactステートを使ってデータを管理
  const [localEntrysheets, setLocalEntrysheets] = useState<EntrysheetsProps>(
    entrysheets || [] // デフォルト値を設定するか、または条件分岐で初期値を設定
  );

  useEffect(() => {
    // 初回の描画時に localEntrysheets をセット
    if (entrysheets) {
      setLocalEntrysheets(entrysheets);
    }
  }, [entrysheets]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!localEntrysheets || !UserIdContext) return <div>Loading...</div>;

  return (
    <div className="flex p-4">
      <UserIdContext.Provider value={query.userId}>
        <Sidebar
          entrysheets={localEntrysheets}
          setEntrysheets={setLocalEntrysheets}
        />
      </UserIdContext.Provider>
    </div>
  );
};

export default Entrysheets;
