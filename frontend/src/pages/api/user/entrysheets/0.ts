import type { RichEntrysheetProps } from "@/types/EntrysheetProps";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<RichEntrysheetProps>
) => {
  if (req.method === "POST") {
    const entrysheet = req.body; // リクエストボディからフォームデータを取得
    res.status(200).json({ ...entrysheet });
  } else {
    const entrysheet: RichEntrysheetProps = {
      esId: 0,
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
  }
};

export default handler;
