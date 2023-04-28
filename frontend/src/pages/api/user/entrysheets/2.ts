import type { NextApiRequest, NextApiResponse } from "next";
import type { RichEntrysheetProps } from "@/types/EntrysheetProps";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<RichEntrysheetProps>
) => {
  const entrysheet: RichEntrysheetProps = {
    esId: "2",
    company: "",
    job: "",
    event: "",
    deadline: "",
    questions: {
      "0": { question: "hello wordld", maxChars: 100, answers: { "0": "" } },
    },
  };
  res.status(200).json(entrysheet);
};

export default handler;
