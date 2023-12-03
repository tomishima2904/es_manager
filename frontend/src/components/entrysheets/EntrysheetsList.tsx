import { UserIdContext } from "@/pages/users/[userId]/entrysheets";
import {
  EntrysheetEntityProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import dateFormatter from "@/utils/dateFormatter";
import Link from "next/link";
import { useContext } from "react";

// ヘッダー行
const ListHeader = () => {
  return (
    <div className="flex items-center px-4 py-2 border-b border-gray-300 bg-white">
      <div className="font-bold flex-grow flex-shrink-0 text-xs">企業</div>
      <div className="font-bold w-1/4 flex-shrink-0 text-xs">職種</div>
      <div className="font-bold w-1/4 flex-shrink-0 text-xs">イベント</div>
      <div className="font-bold w-1/4 flex-shrink-0 text-xs">
        <button className="focus:outline-none text-xs">締切</button>
      </div>
    </div>
  );
};

// EntrySheetsでリスト表示する際のentrysheet1行
const EntrysheetItem = (props: {
  esId: number;
  entrysheet: EntrysheetEntityProps;
}): JSX.Element => {
  const { esId, entrysheet } = props;
  // 日時を yyyy/mm/dd hh:mm の文字列に変換
  const deadline = new Date(entrysheet.deadline);
  const formattedDate = dateFormatter(deadline);
  const userId = useContext(UserIdContext);
  const endpoint = `/${userId}/entrysheets/${esId}`;

  return (
    <Link href={endpoint}>
      <li
        className="flex items-center px-4 py-2 border-b border-gray-300 bg-white
    transition duration-300 ease-in-out hover:bg-gray-100"
      >
        <div className="flex-grow flex-shrink-0 text-xs">
          {entrysheet.company}
        </div>
        <div className="w-1/4 flex-shrink-0 text-xs">{entrysheet.job}</div>
        <div className="w-1/4 flex-shrink-0 text-xs">{entrysheet.event}</div>
        <div className="w-1/4 flex-shrink-0 text-xs">{formattedDate}</div>
      </li>
    </Link>
  );
};

// EntrySheetsリストのコンポーネント
const EntrysheetsList = (props: {
  entrysheets: EntrysheetsProps;
}): JSX.Element => {
  const { entrysheets } = props;

  return (
    <main className="flex-1 bg-white p-4 rounded-lg">
      <ListHeader />
      <ul className="list-none">
        {Object.values(entrysheets).map((entrysheetArray) =>
          entrysheetArray.map((entrysheet) => (
            <EntrysheetItem
              key={entrysheet.esId}
              esId={entrysheet.esId}
              entrysheet={entrysheet}
            />
          ))
        )}
      </ul>
    </main>
  );
};

export default EntrysheetsList;
