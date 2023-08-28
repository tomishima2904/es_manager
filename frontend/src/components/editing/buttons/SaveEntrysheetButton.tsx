import { UserIdContext } from "@/pages/[userId]/entrysheets/[esId]";
import type { RichEntrysheetProps } from "@/types/EntrysheetProps";
import axios from "axios";
import { useContext } from "react";
import { IconContext } from "react-icons";
import { AiOutlineSave } from "react-icons/ai";

const SaveEntrysheetButton = (props: {
  entrysheet: RichEntrysheetProps;
}): JSX.Element => {
  const userId = useContext(UserIdContext);

  const handleClick = () => {
    const { entrysheet } = props;
    const validated_entrysheet = {
      ...entrysheet,
      company: entrysheet.company || "Untitled", // companyは空文字を許容しない
      deadline: entrysheet.deadline || null, // deadlineのどこかに空欄があればnullとみなす
    };
    const endpoint: string = `${process.env.API_HOST}/${userId}/entrysheets/${entrysheet.esId}`;
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
