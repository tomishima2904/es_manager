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
  const url: string = `${process.env.API_HOST}/${query.userId}/entrysheets`;
  const { data: entrysheets, error } = useSWR(url, fetcher);

  if (error) {
    return <div>{error}</div>;
  }
  if (!entrysheets || !UserIdContext) return <div>Loading...</div>;

  return (
    <div className="flex p-4">
      <UserIdContext.Provider value={query.userId}>
        <Sidebar router={router} entrysheets={entrysheets} />
      </UserIdContext.Provider>
    </div>
  );
};

export default Entrysheets;
