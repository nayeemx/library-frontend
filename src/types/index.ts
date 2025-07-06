export type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Borrower {
  _id: string;
  name: string;
  email: string;
}

export interface BorrowBook {
  _id: string;
  book: string | Book;
  quantity: number;
  borrowDate: string;
  dueDate: string;
  borrower: string | Borrower;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: any;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface UpdateBookRequest extends Partial<CreateBookRequest> {}

export interface BorrowBookRequest {
  book: string;
  quantity: number;
  borrowDate: string;
  dueDate: string;
  borrowerName: string;
  borrowerEmail: string;
}

export interface BookFilters {
  filter?: Genre;
  sortBy?: string;
  sort?: 'asc' | 'desc';
  limit?: number;
} 