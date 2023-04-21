// entrysheetsのリストの1行
export type LightEntrysheetProps = {
  company: string;
  job: string;
  event: string;
  deadline: string;
};

export type EntrysheetsProps = {
  [key: string]: LightEntrysheetProps;
};
