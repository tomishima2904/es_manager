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
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import EditingEntrysheet from "./EditingEntrysheet";
import SortableItem from "./SortableItem";
import Tab from "./buttons/Tab";

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

  return (
    <DndContext
      sensors={useSensors(useSensor(PointerSensor))}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]} // 可動範囲を制限
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div className="flex flex-grow flex-shrink-0 flex-col pl-2 pr-2 ml-16">
          {/* タブの選択 */}
          <div className="flex">
            {items.map((order, index) => (
              <SortableItem key={order} id={order} onDragStart={handleChange}>
                <Tab
                  order={order}
                  selectedTab={selectedTab}
                  company={entrysheets[Number(order)].company}
                  onHandleChange={handleChange}
                  setEditingEntrysheets={setEditingEntrysheets}
                  setTabOrder={setTabOrder}
                />
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
