import EditingEntrysheet from "@/components/editing/EditingEntrysheet";
import fetcher from "@/utils/fetcher";
import { GetServerSidePropsContext } from "next";
import useSWR from "swr";

// 動的なパスの値を取得
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: { query },
  };
}

const Entrysheet = ({ query }: GetServerSidePropsContext) => {
  const url: string = "/api/user/entrysheets/" + query.esId;
  const { data: entrysheet, error } = useSWR(url, fetcher);

  if (error) {
    return <div>{error}</div>;
  }
  if (!entrysheet) return <div>Loading...</div>;

  return <EditingEntrysheet entrysheet={entrysheet} />;
};

export default Entrysheet;
