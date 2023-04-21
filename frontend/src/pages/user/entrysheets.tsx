import { useState, useEffect } from "react";
import axios from "axios";
import ListOfEntrysheets from "@/components/entrysheets/Entrysheets";
import type { EntrysheetsProps } from "@/types/LightEntrysheetProps";

export default function Entrysheets() {
  const [entrysheets, setEntrysheets] = useState({});
  useEffect(() => {
    const getEntrysheets = async () => {
      const ENDPOINT = "/api/user/entrysheets";
      const result = await axios.get(ENDPOINT).then((res) => res.data);
      setEntrysheets(result);
    };
    getEntrysheets();
  }, []);

  return (
    <>
      <ListOfEntrysheets entrysheets={entrysheets} />
    </>
  );
}
