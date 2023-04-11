// 型エイリアスで `Entrysheet型` を定義
type EntrySheet = {
  company: string;
  job: string;
  event: string;
  deadline: Date;
};

// EntrySheetsでリスト表示する際のentrysheet1行
const RowOfEntrySheet = (props: { entry_sheet: EntrySheet }): JSX.Element => {
  const { entry_sheet } = props;
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td>{entry_sheet.company}</td>
      <td>{entry_sheet.job}</td>
      <td>{entry_sheet.event}</td>
      <td>{entry_sheet.deadline.toLocaleString()}</td>
    </tr>
  );
};

// EntrySheetsリストを表示
const ListOfEntrySheets = (): JSX.Element => {
  // 以下のentry_sheetsは本来はバックエンドからのAPIを受け取る
  const entry_sheet1: EntrySheet = {
    company: "NTTデータ",
    job: "総合職",
    event: "夏インターン",
    deadline: new Date(),
  };
  const entry_sheet2: EntrySheet = {
    company: "楽天グループ",
    job: "エンジニア",
    event: "本選考",
    deadline: new Date(),
  };
  const entry_sheets: { [key: string]: EntrySheet } = {
    0: entry_sheet1,
    1: entry_sheet2,
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
          {Object.keys(entry_sheets).map((es_id) => (
            <RowOfEntrySheet key={es_id} entry_sheet={entry_sheets[es_id]} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfEntrySheets;
