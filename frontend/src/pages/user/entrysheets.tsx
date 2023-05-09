import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import EntrysheetsList from "@/components/entrysheets/EntrysheetsList";
import Sidebar from "@/components/entrysheets/Sidebar";

export default function Entrysheets() {
  const router = useRouter();
  const [entrysheets, setEntrysheets] = useState({});
  useEffect(() => {
    let isMounted = true;
    const getEntrysheets = async () => {
      const ENDPOINT: string = "/api/user/entrysheets";
      const result = await axios.get(ENDPOINT).then((res) => res.data);
      if (isMounted) setEntrysheets(result);
    };
    getEntrysheets();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex p-4">
      <Sidebar router={router} />
      <EntrysheetsList entrysheets={entrysheets} />
    </div>
  );
}
