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

export type QuestionProps = {
  question: string;
  max_chars: number;
  answers: { [aId: string]: string };
};

export type RichEntrysheetProps = {
  esId: string;
  company: string;
  job: string;
  event: string;
  deadline: string;
  questions: { [qId: string]: QuestionProps };
};
