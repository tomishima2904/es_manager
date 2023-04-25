import { GetServerSidePropsContext } from "next";
import EditingEntrysheet from "@/components/editing/EditingEntrysheet";

const Entrysheet = ({ query }: GetServerSidePropsContext) => {
  console.log(query.esId);
  return <EditingEntrysheet />;
};

// 動的なパスの値を取得
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: { query },
  };
}

export default Entrysheet;
