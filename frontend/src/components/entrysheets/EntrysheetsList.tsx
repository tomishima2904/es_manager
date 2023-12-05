import { UserIdContext } from "@/pages/users/[userId]/entrysheets";
import {
  EditingEntrysheetsProps,
  EntrysheetEntityProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import dateFormatter from "@/utils/dateFormatter";
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
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setTabOrder: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element => {
  const {
    esId,
    entrysheet,
    setEditingEntrysheets,
    setSelectedTab,
    setTabOrder,
  } = props;
  // 日時を yyyy/mm/dd hh:mm の文字列に変換
  const deadline = new Date(entrysheet.deadline);
  const formattedDate = dateFormatter(deadline);
  const userId = useContext(UserIdContext);
  const url = `${process.env.API_HOST}/users/${userId}/entrysheets/${esId}`;

  // Clickされたらデータをフェッチして編集中ESオブジェクトに入れる
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setEditingEntrysheets(
        (prevEditingEntrysheets: EditingEntrysheetsProps) => ({
          ...prevEditingEntrysheets,
          [esId]: { ...data },
        })
      );
      // タブの順序配列にクリックされたesIdをappend
      setTabOrder((prevTabOrder) => {
        const newEsId = String(esId);

        // 指定したesIdが含まれていない場合のみ追加
        if (!prevTabOrder.includes(newEsId)) {
          const newTabOrder = [...prevTabOrder, newEsId];
          return newTabOrder;
        }

        // 指定したesIdが含まれている場合はそのまま返す
        return prevTabOrder;
      });
    } catch (error) {
      // エラーが発生した場合の処理
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    fetchData(); // クリック時にデータをフェッチする関数を呼び出す
    setSelectedTab(String(esId));
  };

  return (
    <li
      className="flex items-center px-4 py-2 border-b border-gray-300 bg-white
    transition duration-300 ease-in-out hover:bg-gray-100"
      onClick={handleClick}
    >
      <div className="flex-grow flex-shrink-0 text-xs">
        {entrysheet.company}
      </div>
      <div className="w-1/4 flex-shrink-0 text-xs">{entrysheet.job}</div>
      <div className="w-1/4 flex-shrink-0 text-xs">{entrysheet.event}</div>
      <div className="w-1/4 flex-shrink-0 text-xs">{formattedDate}</div>
    </li>
  );
};

// EntrySheetsリストのコンポーネント
const EntrysheetsList = (props: {
  entrysheets: EntrysheetsProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setTabOrder: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element => {
  const { entrysheets, setEditingEntrysheets, setSelectedTab, setTabOrder } =
    props;

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
              setEditingEntrysheets={setEditingEntrysheets}
              setSelectedTab={setSelectedTab}
              setTabOrder={setTabOrder}
            />
          ))
        )}
      </ul>
    </main>
  );
};

export default EntrysheetsList;
