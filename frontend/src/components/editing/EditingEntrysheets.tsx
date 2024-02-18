import {
  SelectedTabContext,
  SetSelectedTabContext,
  SetTabOrderContext,
  TabOrderContext,
} from "@/pages/users/[userId]/entrysheets";
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
import { useContext } from "react";
import EditingEntrysheet from "./EditingEntrysheet";
import SortableItem from "./SortableItem";
import Tab from "./Tab";

// HACK: こちらのコンポーネントが巨大になっていると思うので細分化してもいいかも
const EditingEntrysheets = (props: {
  entrysheets: EntrysheetsProps;
  setEntrysheets: React.Dispatch<React.SetStateAction<EntrysheetsProps>>;
  editingEntrysheets: EditingEntrysheetsProps;
  setEditingEntrysheets: React.Dispatch<
    React.SetStateAction<EditingEntrysheetsProps>
  >;
}): JSX.Element => {
  const {
    entrysheets, // companyやevent等の情報
    setEntrysheets,
    editingEntrysheets, // 個々のES内の質問と解答の情報
    setEditingEntrysheets,
  } = props;
  const tabOrder = useContext(TabOrderContext);
  const setTabOrder = useContext(SetTabOrderContext);
  const selectedTab = useContext(SelectedTabContext);
  const setSelectedTab = useContext(SetSelectedTabContext);

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
    setTabOrder(arrayMove(tabOrder, oldIndex, newIndex));
  };

  // 下記の `Tab` コンポーネントで使用
  const handleChange = (selectedTab: string) => setSelectedTab(selectedTab);

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
        <div className="flex flex-grow flex-shrink-0 flex-col pl-2 pr-2 ml-16">
          {/* タブの選択 */}
          <div className="flex">
            {tabOrder.map((esId, index) => (
              <SortableItem key={esId} id={esId} onDragStart={handleChange}>
                <Tab
                  esId={esId}
                  selectedTab={selectedTab}
                  company={entrysheets[Number(esId)].company}
                  onHandleChange={handleChange}
                  setEditingEntrysheets={setEditingEntrysheets}
                  setTabOrder={setTabOrder}
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
