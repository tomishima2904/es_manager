import axios from "axios";
import type { RichEntrysheetProps } from "@/types/EntrysheetProps";

const SaveEntrysheetButton = (props: {
  entrysheet: RichEntrysheetProps;
}): JSX.Element => {
  const handleClick = () => {
    const { entrysheet } = props;
    const endpoint: string = "/api/user/entrysheets/" + entrysheet.esId;
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
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Save
    </button>
  );
};

export default SaveEntrysheetButton;
