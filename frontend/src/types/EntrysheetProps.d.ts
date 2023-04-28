// entrysheetsのリストの1行
export type LightEntrysheetProps = {
  company: string;
  job: string;
  event: string;
  deadline: string;
};

export type EntrysheetsProps = {
  [esId: string]: LightEntrysheetProps;
};

export type NewEntrysheetProps = {
  esId: string;
};

export type QandAProps = {
  question: string;
  maxChars: number;
  answers: { [aId: string]: string };
};

export type QuestionsProps = {
  [qId: string]: QandAProps;
};

export type RichEntrysheetProps = {
  esId: string;
  company: string;
  job: string;
  event: string;
  deadline: string;
  questions: QuestionsProps;
};
