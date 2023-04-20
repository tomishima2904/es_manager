import { LightEntrysheetProps } from "@/types/LightEntrysheetProps";

// EntrySheetsでリスト表示する際のentrysheet1行
const RowOfEntrysheet = (props: {
  entrySheet: LightEntrysheetProps;
}): JSX.Element => {
  const { entrySheet } = props;

  // 日時を yyyy/mm/dd hh:mm の文字列に変換
  const year = entrySheet.deadline.getFullYear();
  const month = ("0" + (entrySheet.deadline.getMonth() + 1)).slice(-2); // 0-padding
  const day = ("0" + entrySheet.deadline.getDate()).slice(-2);
  const hours = ("0" + entrySheet.deadline.getHours()).slice(-2);
  const minutes = ("0" + entrySheet.deadline.getMinutes()).slice(-2);
  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;

  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700
    hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td className="px-6 py-4">{entrySheet.company}</td>
      <td className="px-6 py-4">{entrySheet.job}</td>
      <td className="px-6 py-4">{entrySheet.event}</td>
      <td className="px-6 py-4">{formattedDate}</td>
    </tr>
  );
};

// EntrySheetsリストを表示
const ListOfEntrysheets = (): JSX.Element => {
  // 以下のentrySheetsは本来はバックエンドからのAPIを受け取る
  const entrySheet1: LightEntrysheetProps = {
    company: "NTTデータ",
    job: "総合職",
    event: "夏インターン",
    deadline: new Date(),
  };
  const entrySheet2: LightEntrysheetProps = {
    company: "楽天グループ",
    job: "エンジニア",
    event: "本選考",
    deadline: new Date(),
  };
  const entrySheets: { [key: string]: LightEntrysheetProps } = {
    0: entrySheet1,
    1: entrySheet2,
  };

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
          {Object.keys(entrySheets).map((esId) => (
            <RowOfEntrysheet key={esId} entrySheet={entrySheets[esId]} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfEntrysheets;
