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

export type EntrysheetsProps = { [key: string]: EntrysheetEntityProps[] };

export type NewEntrysheetProps = {
  esId: string;
};

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
  esId: number;
  company: string;
  job: string;
  event: string;
  deadline: string;
  questions: QuestionsProps;
};
