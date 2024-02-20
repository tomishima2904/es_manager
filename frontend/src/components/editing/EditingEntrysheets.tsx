import {
  EditingEntrysheetsProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
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
import EditingEntrysheet from "./EditingEntrysheet";
import SortableItem from "./SortableItem";
import Tab from "./Tab";

const EditingEntrysheets = (props: {
  entrysheets: EntrysheetsProps;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  editingEntrysheets: EditingEntrysheetsProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
  selectedTab: string;
  setSelectedTabs: React.Dispatch<React.SetStateAction<string[]>>;
  tabOrder: string[];
  setTabOrders: React.Dispatch<React.SetStateAction<string[][]>>;
  viewId: number;
}): JSX.Element => {
  const {
    entrysheets, // companyやevent等の情報
    setEntrysheets,
    editingEntrysheets, // 個々のES内の質問と解答の情報
    setEditingEntrysheets,
    selectedTab,
    setSelectedTabs,
    tabOrder,
    setTabOrders,
    viewId,
  } = props;

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5, // Set the distance threshold to 5px
    },
  });

  const handleDragEnd = ({ active, over }: any): void => {
    handleChange(active.id);

    if (!active || !over || active.id === over.id) {
      return;
    }

    const oldIndex = tabOrder.indexOf(active.id);
    const newIndex = tabOrder.indexOf(over.id);
    const newTabOrder = arrayMove(tabOrder, oldIndex, newIndex);
    setTabOrders((prevTabOrders) => {
      const newTabOrders = [...prevTabOrders]; // 前のタブ順序配列をコピー
      newTabOrders[viewId] = newTabOrder; // viewId番目のリストをnewTabOrderに更新
      return newTabOrders; // 新しいタブ順序配列を返す
    });
  };

  // 下記の `Tab` コンポーネントで使用
  const handleChange = (selectedTab: string) =>
    setSelectedTabs((prevSelectedTabs) => {
      const newSelectedTabs = [...prevSelectedTabs]; // 前の選択されたタブ配列をコピー
      newSelectedTabs[viewId] = selectedTab; // tabOrderId番目の値を新しい値で置換
      return newSelectedTabs; // 新しい選択されたタブ配列を返す
    });

  return (
    <DndContext
      sensors={[sensor]}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]} // 可動範囲を制限
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tabOrder}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex flex-col">
          {/* タブの選択 */}
          <div className="flex sticky top-0 bg-white shadow-sm">
            {tabOrder.map((esId, index) => (
              <SortableItem key={esId} id={esId} onDragStart={handleChange}>
                <Tab
                  esId={esId}
                  selectedTab={selectedTab}
                  company={entrysheets[Number(esId)].company}
                  onHandleChange={handleChange}
                  setEditingEntrysheets={setEditingEntrysheets}
                  setTabOrders={setTabOrders}
                  viewId={viewId}
                />
              </SortableItem>
            ))}
          </div>

          {/* 選択されたキーに対応するエントリーシートを表示 */}
          <div>
            {tabOrder.map((order, index) => (
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
