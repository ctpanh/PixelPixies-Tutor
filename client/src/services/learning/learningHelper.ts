export enum LearningItems {
  QUESTGEN = "Question generation",
  INQUIRY = "Documentation inquiry",
  ME = "My Learning",
}

export const WORDLIMIT = 1;

export enum QuestType {
  MCQ = "mcq",
  TF = "tf",
  FIB = "fib",
}
export enum QuestLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const typeQuestion = [
  { id: QuestType.MCQ, name: "Multiple choice question" },
  { id: QuestType.TF, name: "True or False" },
  { id: QuestType.FIB, name: "Fill in the blanks" },
];
export const levelQuestion = [
  { id: QuestLevel.EASY, name: "Easy" },
  { id: QuestLevel.MEDIUM, name: "Medium" },
  { id: QuestLevel.HARD, name: "Hard" },
];

export interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
}
export interface IChatGPTPayload {
  prompt: string;
}

export const headers = ["ID", "Name", "Actions"];

export const data = [
  {
    id: 1,
    name: "askjdaksd",
  },
  {
    id: 2,
    name: "askjaksd",
  },
];
