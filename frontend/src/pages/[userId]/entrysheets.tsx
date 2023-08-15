import EntrysheetsList from "@/components/entrysheets/EntrysheetsList";
import Sidebar from "@/components/entrysheets/Sidebar";
import fetcher from "@/utils/fetcher";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

// 動的なパスの値を取得
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: { query },
  };
}

const Entrysheets = ({ query }: GetServerSidePropsContext) => {
  const router = useRouter();

  // SWR で データフェッチ
  const url: string = "/api/" + query.userId + "/entrysheets";
  const { data: entrysheets, error } = useSWR(url, fetcher);

  if (error) {
    return <div>{error}</div>;
  }
  if (!entrysheets) return <div>Loading...</div>;

  return (
    <div className="flex p-4">
      <Sidebar router={router} />
      <EntrysheetsList entrysheets={entrysheets} />
    </div>
  );
};

export default Entrysheets;
