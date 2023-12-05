import { UserIdContext } from "@/pages/users/[userId]/entrysheets";
import type {
  EditingEntrysheetsProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import axios from "axios";
import { useContext } from "react";
import { IconContext } from "react-icons";
import { AiOutlineSave } from "react-icons/ai";

const SaveEntrysheetButton = (props: {
  esId: number;
  entrysheets: EntrysheetsProps;
  editingEntrysheets: EditingEntrysheetsProps;
}): JSX.Element => {
  const userId = useContext(UserIdContext);

  const handleClick = () => {
    const { esId, entrysheets, editingEntrysheets } = props;
    const validated_entrysheet = {
      ...entrysheets[esId],
      company: entrysheets[esId].company || "Untitled", // companyは空文字を許容しない
      deadline: entrysheets[esId].deadline || null, // deadlineのどこかに空欄があればnullとみなす
      questions: { ...editingEntrysheets[esId] },
    };
    const endpoint: string = `${process.env.API_HOST}/users/${userId}/entrysheets/${esId}`;
    axios
      .post(endpoint, validated_entrysheet, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <IconContext.Provider value={{ className: "w-4 h-4" }}>
      <button onClick={handleClick}>
        <AiOutlineSave className="mr-2" />
      </button>
    </IconContext.Provider>
  );
};

export default SaveEntrysheetButton;
