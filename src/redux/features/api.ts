import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  Book, 
  CreateBookRequest, 
  UpdateBookRequest, 
  BorrowBook, 
  BorrowBookRequest, 
  BorrowSummary, 
  BookFilters,
  ApiResponse 
} from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Book', 'Borrow'],
  endpoints: (builder) => ({
    // Book endpoints
    getBooks: builder.query<ApiResponse<Book[]>, BookFilters>({
      query: (filters) => ({
        url: '/books',
        params: filters,
      }),
      providesTags: ['Book'],
    }),

    getBookById: builder.query<ApiResponse<Book>, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_, __, id) => [{ type: 'Book', id }],
    }),

    createBook: builder.mutation<ApiResponse<Book>, CreateBookRequest>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),

    updateBook: builder.mutation<ApiResponse<Book>, { id: string; book: UpdateBookRequest }>({
      query: ({ id, book }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: book,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Book', id }, 'Book'],
    }),

    deleteBook: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),

    // Borrow endpoints
    borrowBook: builder.mutation<ApiResponse<BorrowBook>, BorrowBookRequest>({
      query: (borrowData) => ({
        url: '/borrow',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Book', 'Borrow'],
    }),

    getBorrowSummary: builder.query<ApiResponse<BorrowSummary[]>, void>({
      query: () => '/borrow',
      providesTags: ['Borrow'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = api; 