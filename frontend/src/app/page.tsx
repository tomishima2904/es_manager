import Image from "next/image";
import { Inter } from "next/font/google";
import ListOfEntrySheets from "./components/EntrySheets";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <p className="text-blue-200">hello</p>
      <ListOfEntrySheets />
    </>
  );
}
