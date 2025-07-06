import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateBookMutation } from '../redux/features/api';
import BookForm from '../components/BookForm';
import type { CreateBookRequest } from '../types';

const CreateBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleSubmit = async (bookData: CreateBookRequest) => {
    try {
      await createBook(bookData).unwrap();
      toast.success('Book created successfully!');
      navigate('/books');
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to create book. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate('/books');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <BookForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateBook; 