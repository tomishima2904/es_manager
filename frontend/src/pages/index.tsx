import Image from "next/image";
import { Inter } from "next/font/google";
import ListOfEntrysheets from "@/components/entrysheets/Entrysheets";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ListOfEntrysheets />
    </>
  );
}
