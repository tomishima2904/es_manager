import type { RichEntrysheetProps } from "@/types/EntrysheetProps";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<RichEntrysheetProps>
) => {
  const entrysheet: RichEntrysheetProps = {
    userId: 1,
    esId: 3,
    company: "Untitled",
    job: "",
    event: "",
    deadline: "",
    isReleased: false,
    questions: {
      "0": { question: "", maxChars: 100, answers: { "0": "" } },
    },
  };
  res.status(200).json(entrysheet);
};

export default handler;
