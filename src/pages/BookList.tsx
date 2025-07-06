import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaEdit, 
  FaTrash, 
  FaHandshake, 
  FaEye, 
  FaPlus, 
  FaSort,
  FaSearch
} from 'react-icons/fa';
import { useGetBooksQuery, useDeleteBookMutation } from '../redux/features/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDialog from '../components/ConfirmDialog';
import type { Book, Genre } from '../types';

const BookList = () => {
  const navigate = useNavigate();
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    filter: undefined as Genre | undefined,
    sortBy: 'createdAt',
    sort: 'desc' as 'asc' | 'desc',
    limit: 10,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const { data: booksResponse, isLoading, error } = useGetBooksQuery(filters);
  const [deleteBook] = useDeleteBookMutation();

  const books = booksResponse?.data || [];

  const handleDelete = async (bookId: string) => {
    try {
      await deleteBook(bookId).unwrap();
      toast.success('Book deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete book. Please try again.');
    }
  };

  const handleBorrow = (book: Book) => {
    navigate(`/borrow/${book._id}`);
  };

  const handleEdit = (book: Book) => {
    navigate(`/edit-book/${book._id}`);
  };

  const handleView = (book: Book) => {
    navigate(`/books/${book._id}`);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load books. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Books</h1>
          <p className="text-gray-600 mt-1">Manage your library collection</p>
        </div>
        <Link
          to="/create-book"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Add New Book
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Genre Filter */}
          <div>
            <select
              value={filters.filter}
              onChange={(e) => setFilters(prev => ({ ...prev, filter: e.target.value as Genre | undefined }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Genres</option>
              <option value="FICTION">Fiction</option>
              <option value="NON_FICTION">Non-Fiction</option>
              <option value="SCIENCE">Science</option>
              <option value="HISTORY">History</option>
              <option value="BIOGRAPHY">Biography</option>
              <option value="FANTASY">Fantasy</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt">Date Added</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="copies">Copies</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <button
              onClick={() => setFilters(prev => ({ ...prev, sort: prev.sort === 'asc' ? 'desc' : 'asc' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              <FaSort className="mr-2" />
              {filters.sort === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Copies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{book.title}</div>
                      <div className="text-sm text-gray-500">{book.author}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {book.genre.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.isbn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.copies}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      book.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(book)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(book)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Book"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleBorrow(book)}
                        disabled={!book.available || book.copies === 0}
                        className={`${
                          book.available && book.copies > 0
                            ? 'text-purple-600 hover:text-purple-900'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        title={book.available && book.copies > 0 ? 'Borrow Book' : 'Not available for borrowing'}
                      >
                        <FaHandshake />
                      </button>
                      <button
                        onClick={() => setDeleteBookId(book._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Book"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No books found.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteBookId}
        onClose={() => setDeleteBookId(null)}
        onConfirm={() => deleteBookId && handleDelete(deleteBookId)}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default BookList; 