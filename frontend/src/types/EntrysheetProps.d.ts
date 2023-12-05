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

export type EntrysheetsProps = { [key: number]: EntrysheetEntityProps };

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

export type EditingEntrysheetsProps = {
  [esId: number]: QuestionsProps;
};

// バックエンドからのレスポンスデータの形式
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
