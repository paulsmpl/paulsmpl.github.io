import { Author } from "./author";
import { Book } from "./book";

export type Quote = {
  id: number;
  authorId: number;
  bookId: number;
  quote: string;
  position: number;
  enabled: boolean;
  author?: Author;
  book?: Book;
  createdAt: string;
  updatedAt: string;
};
