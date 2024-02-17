import { Author } from "./author";

export type Book = {
  id: number;
  bookName: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  author?: Author;
};
