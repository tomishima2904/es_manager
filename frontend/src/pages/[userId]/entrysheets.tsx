import EntrysheetsList from "@/components/entrysheets/EntrysheetsList";
import Sidebar from "@/components/entrysheets/Sidebar";
import fetcher from "@/utils/fetcher";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { createContext } from "react";
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
  const router = useRouter();

  // SWR で データフェッチ
  // TODO: ホストを環境変数で変えられるようにしたい
  const url: string = "/api/" + query.userId + "/entrysheets";
  //   const url: string = "http://localhost:8001/" + query.userId + "/entrysheets";
  const { data: entrysheets, error } = useSWR(url, fetcher);

  if (error) {
    return <div>{error}</div>;
  }
  if (!entrysheets || !UserIdContext) return <div>Loading...</div>;

  return (
    <div className="flex p-4">
      <UserIdContext.Provider value={query.userId}>
        <Sidebar router={router} />
        <EntrysheetsList entrysheets={entrysheets} />
      </UserIdContext.Provider>
    </div>
  );
};

export default Entrysheets;
