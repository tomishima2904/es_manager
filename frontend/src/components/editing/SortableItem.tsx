import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// dnd-kit/sortable で ソート可能にするアイテムに使うコンポーネント
const SortableItem = (props: {
  id: string;
  onDragStart: (activeId: string) => void;
  children: React.ReactNode;
}): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Dragが開始された時にhandleChangeを呼び出す
  const handleDragStart = () => {
    props.onDragStart(props.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDragStart={handleDragStart}
    >
      {props.children}
    </div>
  );
};

export default SortableItem;
