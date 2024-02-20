import EditingEntrysheetsViewsManager from "@/components/editing/EditingEntrysheetsViewsManager";
import Sidebar from "@/components/entrysheets/Sidebar";
import {
  EditingEntrysheetsProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import fetcher from "@/utils/fetcher";
import { GetServerSidePropsContext } from "next";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

// 動的なパスの値を取得
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return {
    props: { query },
  };
}

// 全てのコンポーネントで利用するであろうuserIdを定義
// TODO: userIdの型をnumberにする
export const UserIdContext = createContext<
  string | string[] | undefined | null
>(null);

const Entrysheets = ({ query }: GetServerSidePropsContext) => {
  // 編集中のエントリシートを管理する
  const [editingEntrysheets, setEditingEntrysheets] =
    useState<EditingEntrysheetsProps>({});

  // 編集中のエントリーシートのタブの順番を管理する
  const [tabOrders, setTabOrders] = useState<string[][]>([[], []]);
  const [selectedTabs, setSelectedTabs] = useState<string[]>(["", ""]);

  // `TabCloseButton`によってタブが閉じられた場合の挙動を制御
  useEffect(() => {
    tabOrders.forEach((tabOrder, index) => {
      if (tabOrder.length > 0 && !tabOrder.includes(selectedTabs[index])) {
        // `tabOrder`が空配列でなく，かつ，`selectedTab`が`tabOrder`中に存在しない場合
        setSelectedTabs((prevSelectedTabs) => {
          const newSelectedTabs = [...prevSelectedTabs];
          newSelectedTabs[index] = tabOrder[tabOrder.length - 1];
          return newSelectedTabs;
        }); // `selectedTab`を更新
      }
    });
  }, [tabOrders, selectedTabs]);

  // SWR で データフェッチ
  const url: string = `${process.env.API_HOST}/users/${query.userId}/entrysheets`;
  const { data: entrysheets, error } = useSWR(url, fetcher);

  // ローカルのReactステートを使ってデータを管理
  const [localEntrysheets, setLocalEntrysheets] = useState<EntrysheetsProps>(
    entrysheets || [] // デフォルト値を設定するか、または条件分岐で初期値を設定
  );

  useEffect(() => {
    // 初回の描画時に localEntrysheets をセット
    if (entrysheets) {
      setLocalEntrysheets(entrysheets);
    }
  }, [entrysheets]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!localEntrysheets || !UserIdContext) return <div>Loading...</div>;

  return (
    <div className="flex pr-4">
      <UserIdContext.Provider value={query.userId}>
        <Sidebar
          entrysheets={localEntrysheets}
          setEntrysheets={setLocalEntrysheets}
          setEditingEntrysheets={setEditingEntrysheets}
          setSelectedTabs={setSelectedTabs}
          setTabOrders={setTabOrders}
        />
        <EditingEntrysheetsViewsManager
          entrysheets={localEntrysheets}
          setEntrysheets={setLocalEntrysheets}
          editingEntrysheets={editingEntrysheets}
          setEditingEntrysheets={setEditingEntrysheets}
          selectedTabs={selectedTabs}
          setSelectedTabs={setSelectedTabs}
          tabOrders={tabOrders}
          setTabOrders={setTabOrders}
        />
      </UserIdContext.Provider>
    </div>
  );
};

export default Entrysheets;
