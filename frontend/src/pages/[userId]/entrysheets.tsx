import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import EntrysheetsList from "@/components/entrysheets/EntrysheetsList";
import Sidebar from "@/components/entrysheets/Sidebar";

export default function Entrysheets() {
  const router = useRouter();

  // SWR で データフェッチ
  const url: string = "/api/user/entrysheets";
  const { data: entrysheets, error } = useSWR(url, fetcher);

  if (error) {
    return <div>{error}</div>;
  }
  if (!entrysheets) return <div>Loading...</div>;

  return (
    <div className="flex p-4">
      <Sidebar router={router} />
      <EntrysheetsList entrysheets={entrysheets} />
    </div>
  );
}
