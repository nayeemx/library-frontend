import { FaChartBar, FaBook, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGetBorrowSummaryQuery } from '../redux/features/api';
import LoadingSpinner from '../components/LoadingSpinner';

const BorrowSummary = () => {
  const navigate = useNavigate();
  const { data: summaryResponse, isLoading, error } = useGetBorrowSummaryQuery();

  const summary = summaryResponse?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Failed to load borrow summary</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/books')}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-6"
            >
              <FaArrowLeft className="mr-2" />
              Back to Books
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Borrow Summary</h1>
              <p className="text-gray-600 mt-1">Overview of all borrowed books</p>
            </div>
          </div>
          <div className="flex items-center text-blue-600">
            <FaChartBar className="text-2xl" />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaBook className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Books Borrowed</p>
                <p className="text-2xl font-semibold text-gray-900">{summary.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaChartBar className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Copies Borrowed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {summary.reduce((total, item) => total + item.totalQuantity, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FaBook className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average per Book</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {summary.length > 0 
                    ? Math.round(summary.reduce((total, item) => total + item.totalQuantity, 0) / summary.length)
                    : 0
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Borrow Summary Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Borrowed Books Details</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Quantity Borrowed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {summary.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.book.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.book.isbn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {item.totalQuantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Borrowed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {summary.length === 0 && (
            <div className="text-center py-12">
              <FaBook className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No books borrowed</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by borrowing some books from the library.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/books')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Browse Books
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary; 