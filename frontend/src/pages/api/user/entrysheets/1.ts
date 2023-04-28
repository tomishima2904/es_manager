import type { NextApiRequest, NextApiResponse } from "next";
import type { RichEntrysheetProps } from "@/types/EntrysheetProps";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<RichEntrysheetProps>
) => {
  const entrysheet: RichEntrysheetProps = {
    esId: "1",
    company: "A株式会社",
    job: "総合職",
    event: "夏インターン",
    deadline: "2023-03-31T12:00:00",
    questions: {
      "0": {
        question: "志望動機は?",
        maxChars: 400,
        answers: {
          "0": "とても楽しいそうだからです。",
          "1": "アットホームだ",
        },
      },
      "1": {
        question: "強みは?",
        maxChars: 100,
        answers: {
          "0": "元気",
        },
      },
    },
  };
  res.status(200).json(entrysheet);
};

export default handler;
