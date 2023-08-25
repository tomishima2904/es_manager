import EditingEntrysheet from "@/components/editing/EditingEntrysheet";
import fetcher from "@/utils/fetcher";
import { GetServerSidePropsContext } from "next";
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

const Entrysheet = ({ query }: GetServerSidePropsContext) => {
  const url: string = `/api/${query.userId}/entrysheets/${query.esId}`;
  //   const url: string = `http://localhost:8001/${query.userId}/entrysheets/${query.esId}`;
  const { data: entrysheet, error } = useSWR(url, fetcher);

  if (error) {
    return <div>{error}</div>;
  }
  if (!entrysheet || !UserIdContext) return <div>Loading...</div>;

  return (
    <UserIdContext.Provider value={query.userId}>
      <EditingEntrysheet entrysheet={entrysheet} />
    </UserIdContext.Provider>
  );
};

export default Entrysheet;
