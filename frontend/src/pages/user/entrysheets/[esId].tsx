import { GetServerSidePropsContext } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import EditingEntrysheet from "@/components/editing/EditingEntrysheet";

// 動的なパスの値を取得
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: { query },
  };
}

const Entrysheet = ({ query }: GetServerSidePropsContext) => {
  const [entrysheet, setEntrysheet] = useState({});
  useEffect(() => {
    const getEntrysheets = async () => {
      const ENDPOINT: string = "/api/user/entrysheets/" + query.esId;
      const result = await axios.get(ENDPOINT).then((res) => res.data);
      setEntrysheet(result);
    };
    getEntrysheets();
  }, []);

  return <EditingEntrysheet />;
};

export default Entrysheet;
