import { useState } from 'react';
import { FaHandshake, FaTimes } from 'react-icons/fa';
import type { Book, BorrowBookRequest } from '../types';

interface BorrowFormProps {
  book: Book;
  onSubmit: (data: BorrowBookRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BorrowForm = ({ book, onSubmit, onCancel, isLoading = false }: BorrowFormProps) => {
  const [formData, setFormData] = useState<Omit<BorrowBookRequest, 'book'>>({
    quantity: 1,
    borrowDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
    borrowerName: '',
    borrowerEmail: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.borrowerName.trim()) {
      newErrors.borrowerName = 'Borrower name is required';
    }

    if (!formData.borrowerEmail.trim()) {
      newErrors.borrowerEmail = 'Borrower email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.borrowerEmail)) {
      newErrors.borrowerEmail = 'Please enter a valid email address';
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    } else if (formData.quantity > book.copies) {
      newErrors.quantity = `Cannot borrow more than ${book.copies} copies`;
    }

    if (!formData.borrowDate) {
      newErrors.borrowDate = 'Borrow date is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else if (new Date(formData.dueDate) <= new Date(formData.borrowDate)) {
      newErrors.dueDate = 'Due date must be after borrow date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        book: book._id,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Borrow Book</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Book Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Author:</span> {book.author}
          </div>
          <div>
            <span className="font-medium">Genre:</span> {book.genre.replace('_', ' ')}
          </div>
          <div>
            <span className="font-medium">ISBN:</span> {book.isbn}
          </div>
          <div>
            <span className="font-medium">Available Copies:</span> {book.copies}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Borrower Name */}
          <div>
            <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700 mb-2">
              Borrower Name *
            </label>
            <input
              type="text"
              id="borrowerName"
              name="borrowerName"
              value={formData.borrowerName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.borrowerName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter borrower name"
            />
            {errors.borrowerName && <p className="mt-1 text-sm text-red-600">{errors.borrowerName}</p>}
          </div>

          {/* Borrower Email */}
          <div>
            <label htmlFor="borrowerEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Borrower Email *
            </label>
            <input
              type="email"
              id="borrowerEmail"
              name="borrowerEmail"
              value={formData.borrowerEmail}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.borrowerEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter borrower email"
            />
            {errors.borrowerEmail && <p className="mt-1 text-sm text-red-600">{errors.borrowerEmail}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max={book.copies}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
          </div>

          {/* Borrow Date */}
          <div>
            <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700 mb-2">
              Borrow Date *
            </label>
            <input
              type="date"
              id="borrowDate"
              name="borrowDate"
              value={formData.borrowDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.borrowDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.borrowDate && <p className="mt-1 text-sm text-red-600">{errors.borrowDate}</p>}
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={formData.borrowDate}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.dueDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <FaHandshake />
            <span>{isLoading ? 'Processing...' : 'Borrow Book'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BorrowForm; 