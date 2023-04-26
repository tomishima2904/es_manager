import { GetServerSidePropsContext } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import EditingEntrysheet from "@/components/editing/EditingEntrysheet";
import { RichEntrysheetProps } from "@/types/EntrysheetProps";

// 動的なパスの値を取得
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: { query },
  };
}

const Entrysheet = ({ query }: GetServerSidePropsContext) => {
  const [entrysheet, setEntrysheet] = useState<RichEntrysheetProps>({
    esId: "",
    company: "",
    job: "",
    event: "",
    deadline: "",
    questions: {},
  });
  useEffect(() => {
    const getEntrysheets = async () => {
      const ENDPOINT: string = "/api/user/entrysheets/" + query.esId;
      const result = await axios.get(ENDPOINT).then((res) => res.data);
      setEntrysheet((prevEntrysheet) => ({ ...prevEntrysheet, ...result }));
    };
    getEntrysheets();
  }, []);

  return <EditingEntrysheet entrysheet={entrysheet} />;
};

export default Entrysheet;
