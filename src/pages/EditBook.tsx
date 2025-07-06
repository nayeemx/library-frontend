import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetBookByIdQuery, useUpdateBookMutation } from '../redux/features/api';
import BookForm from '../components/BookForm';
import LoadingSpinner from '../components/LoadingSpinner';
import type { CreateBookRequest } from '../types';

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const { data: bookResponse, isLoading: isLoadingBook, error } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const book = bookResponse?.data;

  const handleSubmit = async (bookData: CreateBookRequest) => {
    if (!id) return;
    
    try {
      await updateBook({ id, book: bookData }).unwrap();
      toast.success('Book updated successfully!');
      navigate('/books');
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to update book. Please try again.';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <BookForm
        book={book}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default EditBook; 