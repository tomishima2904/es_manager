import {
  LightEntrysheetProps,
  EntrysheetsProps,
} from "@/types/LightEntrysheetProps";

// ヘッダー行
const Header = () => {
  return (
    <div className="flex items-center px-4 py-2 border-b border-gray-300">
      <div className="font-bold flex-grow flex-shrink-0">企業</div>
      <div className="font-bold w-1/4 flex-shrink-0">職種</div>
      <div className="font-bold w-1/4 flex-shrink-0">イベント</div>
      <div className="font-bold w-1/4 flex-shrink-0">
        <button className="focus:outline-none">締切</button>
      </div>
    </div>
  );
};

// EntrySheetsでリスト表示する際のentrysheet1行
const RowOfEntrysheet = (props: {
  entrysheet: LightEntrysheetProps;
}): JSX.Element => {
  const { entrysheet } = props;
  // 日時を yyyy/mm/dd hh:mm の文字列に変換
  const deadline = new Date(entrysheet.deadline);
  const formattedDate = `${deadline.getFullYear()}/${(deadline.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${deadline
    .getDate()
    .toString()
    .padStart(2, "0")} ${deadline
    .getHours()
    .toString()
    .padStart(2, "0")}:${deadline.getMinutes().toString().padStart(2, "0")}`;

  return (
    <li
      className="flex items-center px-4 py-2 border-b border-gray-300
    transition duration-300 ease-in-out hover:bg-gray-100"
    >
      <div className="flex-grow flex-shrink-0">{entrysheet.company}</div>
      <div className="w-1/4 flex-shrink-0">{entrysheet.job}</div>
      <div className="w-1/4 flex-shrink-0">{entrysheet.event}</div>
      <div className="w-1/4 flex-shrink-0">{formattedDate}</div>
    </li>
  );
};

// EntrySheetsリストのコンポーネント
const ListOfEntrysheets = (props: {
  entrysheets: EntrysheetsProps;
}): JSX.Element => {
  const { entrysheets } = props;

  return (
    <div className="rounded-lg bg-white">
      <Header />
      <ul className="list-none">
        {Object.keys(entrysheets).map((esId) => (
          <RowOfEntrysheet key={esId} entrysheet={entrysheets[esId]} />
        ))}
      </ul>
    </div>
  );
};

export default ListOfEntrysheets;
