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
    const endpoint: string = `${process.env.API_HOST}/${userId}/entrysheets/${entrysheet.esId}`;
    console.log(entrysheet);
    axios
      .post(endpoint, entrysheet, {
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
