import type { NextApiRequest, NextApiResponse } from "next";
import type { RichEntrysheetProps } from "@/types/EntrysheetProps";

export default (
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
      "0": { question: "hello wordld", max_chars: 100, answers: { "0": "" } },
    },
  };
  res.status(200).json(entrysheet);
};
