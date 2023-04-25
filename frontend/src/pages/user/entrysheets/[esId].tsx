import { GetServerSidePropsContext } from "next";

const Entrysheet = ({ query }: GetServerSidePropsContext) => {
  console.log(query.esId);
  return <div className="p-1">This is a dummy entrysheet</div>;
};

// 動的なパスの値を取得
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: { query },
  };
}

export default Entrysheet;
