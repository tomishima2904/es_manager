// entrysheetsのリストの1行
export type EntrysheetEntityProps = {
  userId: number;
  esId: number;
  company: string;
  job: string;
  event: string;
  deadline: string;
  isReleased: boolean;
};

// EntrysheetsPropsの例.
// entrysheets = {entrysheets: [entrysheetEntiti1, entrysheetEntity2]}
export type EntrysheetsProps = { [key: string]: EntrysheetEntityProps[] };

export type AnswersProps = {
  [aId: string]: string;
};

export type QandAProps = {
  question: string;
  maxChars: number;
  answers: AnswersProps;
};

export type QuestionsProps = {
  [qId: string]: QandAProps;
};

export type RichEntrysheetProps = {
  userId: number;
  esId: number;
  company: string;
  job: string;
  event: string;
  deadline: string;
  isReleased: boolean;
  questions: QuestionsProps;
};

export type EditingEntrysheetsProps = {
  [esId: number]: RichEntrysheetProps;
};
