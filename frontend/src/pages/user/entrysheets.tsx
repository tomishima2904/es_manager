import { useState, useEffect } from "react";
import axios from "axios";
import EntrysheetsList from "@/components/entrysheets/EntrysheetsList";
import Sidebar from "@/components/entrysheets/Sidebar";
import type { EntrysheetsProps } from "@/types/LightEntrysheetProps";

export default function Entrysheets() {
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
      <Sidebar />
      <EntrysheetsList entrysheets={entrysheets} />
    </div>
  );
}
