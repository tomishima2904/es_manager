import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import EntrysheetsList from "@/components/entrysheets/EntrysheetsList";
import Sidebar from "@/components/entrysheets/Sidebar";

export default function Entrysheets() {
  const router = useRouter();
  // TODO: axiosによるfetch操作をカスタムフック化したい
  const [entrysheets, setEntrysheets] = useState({});
  useEffect(() => {
    const getEntrysheets = async () => {
      const ENDPOINT: string = "/api/user/entrysheets";
      const result = await axios.get(ENDPOINT).then((res) => res.data);
      setEntrysheets(result);
    };
    getEntrysheets();
  }, []);

  return (
    <div className="flex p-4">
      <Sidebar router={router} />
      <EntrysheetsList entrysheets={entrysheets} />
    </div>
  );
}
