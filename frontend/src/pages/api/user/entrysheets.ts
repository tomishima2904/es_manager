import type { NextApiRequest, NextApiResponse } from "next";
import type {
  LightEntrysheetProps,
  EntrysheetsProps,
} from "@/types/LightEntrysheetProps";

export default (
  req: NextApiRequest,
  res: NextApiResponse<EntrysheetsProps>
) => {
  const entrysheet1: LightEntrysheetProps = {
    company: "A株式会社",
    job: "総合職",
    event: "夏インターン",
    deadline: "2023-03-31T12:00:00",
  };
  const entrysheet2: LightEntrysheetProps = {
    company: "株式会社B",
    job: "エンジニア",
    event: "本選考",
    deadline: "2023-04-21T18:00:00",
  };
  const entrysheets: { [key: string]: LightEntrysheetProps } = {
    "0": entrysheet1,
    "1": entrysheet2,
  };
  res.status(200).json(entrysheets);
};
