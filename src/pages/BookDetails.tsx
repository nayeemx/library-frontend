import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaHandshake } from 'react-icons/fa';
import { useGetBookByIdQuery } from '../redux/features/api';
import LoadingSpinner from '../components/LoadingSpinner';

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const { data: bookResponse, isLoading, error } = useGetBookByIdQuery(id!);
  const book = bookResponse?.data;

  if (isLoading) {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/books')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Books
          </button>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/edit-book/${book._id}`)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaEdit className="mr-2" />
              Edit Book
            </button>
            <button
              onClick={() => navigate(`/borrow/${book._id}`)}
              disabled={!book.available || book.copies === 0}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                book.available && book.copies > 0
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              <FaHandshake className="mr-2" />
              Borrow Book
            </button>
          </div>
        </div>

        {/* Book Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-6">by {book.author}</p>
                
                {book.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{book.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Book Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Genre:</span>
                        <span className="font-medium">{book.genre.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ISBN:</span>
                        <span className="font-medium">{book.isbn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Copies Available:</span>
                        <span className="font-medium">{book.copies}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${
                          book.available ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {book.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Timestamps</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Added:</span>
                        <span className="font-medium">
                          {new Date(book.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">
                          {new Date(book.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability Status</h3>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                        book.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {book.available ? 'Available for Borrowing' : 'Currently Unavailable'}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{book.copies}</div>
                      <div className="text-sm text-gray-600">Copies Available</div>
                    </div>

                    {book.available && book.copies > 0 && (
                      <button
                        onClick={() => navigate(`/borrow/${book._id}`)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        <FaHandshake className="mr-2" />
                        Borrow This Book
                      </button>
                    )}

                    {!book.available && (
                      <div className="text-center text-sm text-gray-500">
                        This book is currently unavailable for borrowing.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails; 