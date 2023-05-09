import {
  LightEntrysheetProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";

// ヘッダー行
const ListHeader = () => {
  return (
    <div className="flex items-center px-4 py-2 border-b border-gray-300 bg-white">
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
const EntrysheetItem = (props: {
  entrysheet: LightEntrysheetProps;
}): JSX.Element => {
  const { entrysheet } = props;
  // 日時を yyyy/mm/dd hh:mm の文字列に変換
  const deadline = new Date(entrysheet.deadline);
  const formattedDate = dateFormatter(deadline);
  const endpoint = `/user/entrysheets/${esId}`;

  return (
    <li
      className="flex items-center px-4 py-2 border-b border-gray-300 bg-white
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
const EntrysheetsList = (props: {
  entrysheets: EntrysheetsProps;
}): JSX.Element => {
  const { entrysheets } = props;

  return (
    <main className="flex-1 bg-white p-4 rounded-lg">
      <ListHeader />
      <ul className="list-none">
        {Object.keys(entrysheets).map((esId) => (
          <EntrysheetItem key={esId} entrysheet={entrysheets[esId]} />
        ))}
      </ul>
    </main>
  );
};

export default EntrysheetsList;
