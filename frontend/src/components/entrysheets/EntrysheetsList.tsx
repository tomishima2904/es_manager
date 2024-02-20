import { UserIdContext } from "@/pages/users/[userId]/entrysheets";
import {
  EditingEntrysheetsProps,
  EntrysheetEntityProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import dateFormatter from "@/utils/dateFormatter";
import isElementContained from "@/utils/isElementContained";
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
  setSelectedTabs: React.Dispatch<React.SetStateAction<string[]>>;
  setTabOrders: React.Dispatch<React.SetStateAction<string[][]>>;
}): JSX.Element => {
  const {
    esId,
    entrysheet,
    setEditingEntrysheets,
    setSelectedTabs,
    setTabOrders,
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
          [esId]: { ...data.questions },
        })
      );
      // タブの順序配列にクリックされたesIdをappend
      // TODO: 今は強制的にメイン画面で開くが，右クリックで分割して開けるようにする
      setTabOrders((prevTabOrders) => {
        const newEsId = String(esId);

        // 指定したesIdが含まれていない表示中でない場合のみ追加
        if (!isElementContained(prevTabOrders, newEsId)) {
          const newTabOrders = [...prevTabOrders];
          newTabOrders[0] = [...prevTabOrders[0], newEsId];
          return newTabOrders;
        }

        // 指定したesIdが含まれている場合はそのまま返す
        return prevTabOrders;
      });
    } catch (error) {
      // エラーが発生した場合の処理
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    fetchData(); // クリック時にデータをフェッチする関数を呼び出す
    // リスト中にあるクリックしたESを編集中のESに設定
    setSelectedTabs((prevSelectedTabs) => {
      const newSelectedTabs = [...prevSelectedTabs]; // 前の選択されたタブ配列をコピー
      newSelectedTabs[0] = String(esId); // tabOrderId番目の値を新しい値で置換
      return newSelectedTabs; // 新しい選択されたタブ配列を返す
    });
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
  setSelectedTabs: React.Dispatch<React.SetStateAction<string[]>>;
  setTabOrders: React.Dispatch<React.SetStateAction<string[][]>>;
}): JSX.Element => {
  const { entrysheets, setEditingEntrysheets, setSelectedTabs, setTabOrders } =
    props;

  return (
    <main className="flex-1 bg-white p-4 rounded-lg">
      <ListHeader />
      <ul className="list-none">
        {Object.keys(entrysheets).map((esId) => (
          <EntrysheetItem
            key={esId}
            esId={Number(esId)}
            entrysheet={entrysheets[Number(esId)]}
            setEditingEntrysheets={setEditingEntrysheets}
            setSelectedTabs={setSelectedTabs}
            setTabOrders={setTabOrders}
          />
        ))}
      </ul>
    </main>
  );
};

export default EntrysheetsList;
