import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetBookByIdQuery, useBorrowBookMutation } from '../redux/features/api';
import BorrowForm from '../components/BorrowForm';
import LoadingSpinner from '../components/LoadingSpinner';
import type { BorrowBookRequest } from '../types';

const BorrowBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  
  const { data: bookResponse, isLoading: isLoadingBook, error } = useGetBookByIdQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const book = bookResponse?.data;

  const handleSubmit = async (borrowData: BorrowBookRequest) => {
    try {
      await borrowBook(borrowData).unwrap();
      toast.success('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to borrow book. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate('/books');
  };

  if (isLoadingBook) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Book not found</p>
          <button
            onClick={() => navigate('/books')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  if (!book.available || book.copies === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">This book is not available for borrowing</p>
          <button
            onClick={() => navigate('/books')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <BorrowForm
        book={book}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isBorrowing}
      />
    </div>
  );
};

export default BorrowBook; 