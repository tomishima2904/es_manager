import {
  EditingEntrysheetsProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import EditingEntrysheet from "./EditingEntrysheet";
import SortableItem from "./SortableItem";
import TabCloseButton from "./buttons/TabCloseButton";

// HACK: こちらのコンポーネントが巨大になっていると思うので細分化してもいいかも
const EditingEntrysheets = (props: {
  entrysheets: EntrysheetsProps;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  editingEntrysheets: EditingEntrysheetsProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  tabOrder: string[];
  setTabOrder: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element => {
  const {
    entrysheets, // companyやevent等の情報
    setEntrysheets,
    editingEntrysheets, // 個々のES内の質問と解答の情報
    setEditingEntrysheets,
    selectedTab,
    setSelectedTab,
    tabOrder,
    setTabOrder,
  } = props;

  // dnd-kit/sortableでタブをドラッグ&ドロップによるソート可能にするために使用
  const [items, setItems] = useState<string[]>(tabOrder);
  useEffect(() => {
    setItems(tabOrder);
  }, [tabOrder]);

  const handleDragEnd = ({ active, over }: any): void => {
    handleChange(active.id);

    // ただクリックされた時だけの場合はこの関数は実行しない
    if (!active || !over || active.id === over.id) {
      return;
    }

    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
    setTabOrder(arrayMove(tabOrder, oldIndex, newIndex));
  };

  // 下記の `Tab` コンポーネントで使用
  const handleChange = (selectedTab: string) => setSelectedTab(selectedTab);

  // `order`で selectedTab であるかそうでないかを判断して, スタイルを変える
  const Tab = (props: { order: string }): JSX.Element => {
    const { order } = props;
    return (
      <div
        className={`flex-grow max-w-xs flex-shrink-0 px-4 py-2 text-sm cursor-pointer ${
          order === selectedTab
            ? "bg-white border-t border-l border-r border-gray-300 rounded-t-xl"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={() => handleChange(order)}
      >
        <div className="flex justify-between">
          <div className="">{entrysheets[Number(order)].company}</div>
          <div className="flex-none">
            <TabCloseButton
              esId={Number(order)}
              setEditingEntrysheets={setEditingEntrysheets}
              setTabOrder={setTabOrder}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <DndContext
      sensors={useSensors(useSensor(PointerSensor))}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div className="flex flex-grow flex-shrink-0 flex-col pl-2 pr-2 ml-16">
          {/* タブの選択 */}
          <div className="flex">
            {items.map((order, index) => (
              <SortableItem key={order} id={order} onDragStart={handleChange}>
                <Tab order={order} />
              </SortableItem>
            ))}
          </div>

          {/* 選択されたキーに対応するエントリーシートを表示 */}
          <div>
            {items.map((order, index) => (
              <div
                key={order}
                className={order === selectedTab ? "block" : "hidden"}
              >
                <EditingEntrysheet
                  esId={Number(order)}
                  entrysheets={entrysheets}
                  setEntrysheets={setEntrysheets}
                  editingEntrysheets={editingEntrysheets}
                  setEditingEntrysheets={setEditingEntrysheets}
                />
              </div>
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default EditingEntrysheets;
