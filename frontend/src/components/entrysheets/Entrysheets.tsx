import {
  LightEntrysheetProps,
  EntrysheetsProps,
} from "@/types/LightEntrysheetProps";

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
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700
    hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td className="px-6 py-4">{entrysheet.company}</td>
      <td className="px-6 py-4">{entrysheet.job}</td>
      <td className="px-6 py-4">{entrysheet.event}</td>
      <td className="px-6 py-4">{formattedDate}</td>
    </tr>
  );
};

// EntrySheetsリストを表示
const ListOfEntrysheets = (props: {
  entrysheets: EntrysheetsProps;
}): JSX.Element => {
  const { entrysheets } = props;

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              企業
            </th>
            <th scope="col" className="px-6 py-3">
              職種
            </th>
            <th scope="col" className="px-6 py-3">
              イベント
            </th>
            <th scope="col" className="px-6 py-3">
              締切
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(entrysheets).map((esId) => (
            <RowOfEntrysheet key={esId} entrysheet={entrysheets[esId]} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfEntrysheets;
