import type {
  EntrysheetEntityProps,
  EntrysheetsProps,
} from "@/types/EntrysheetProps";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<EntrysheetsProps | EntrysheetEntityProps>
) => {
  if (req.method === "POST") {
    const entrysheet: EntrysheetEntityProps = {
      userId: 1,
      esId: 2,
      company: "Untitled",
      job: "",
      event: "",
      deadline: "2023-03-31T12:00:00",
      isReleased: false,
    };
    res.status(200).json(entrysheet);
  } else {
    const entrysheet1: EntrysheetEntityProps = {
      userId: 1,
      esId: 0,
      company: "A株式会社",
      job: "総合職",
      event: "夏インターン",
      deadline: "2023-03-31T12:00:00",
      isReleased: false,
    };
    const entrysheet2: EntrysheetEntityProps = {
      userId: 1,
      esId: 1,
      company: "株式会社B",
      job: "エンジニア",
      event: "本選考",
      deadline: "2023-04-21T18:00:00",
      isReleased: false,
    };
    const entrysheets: EntrysheetsProps = {
      entrysheets: [entrysheet1, entrysheet2],
    };
    res.status(200).json(entrysheets);
  }
};

export default handler;
