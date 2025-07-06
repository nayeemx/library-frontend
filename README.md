# Library Management System - Frontend

A modern, responsive library management system built with React, TypeScript, Redux Toolkit Query, and Tailwind CSS.

## 🚀 Features

### 📚 Book Management
- **View All Books**: Responsive table with search, filtering, and sorting
- **Add New Books**: Form with validation for creating new books
- **Edit Books**: Update existing book information
- **Delete Books**: Confirmation dialog before deletion
- **Book Details**: Comprehensive view of individual books

### 📖 Borrowing System
- **Borrow Books**: Form to borrow books with borrower information
- **Borrow Summary**: Aggregated view of all borrowed books
- **Validation**: Ensures quantity doesn't exceed available copies
- **Auto Status Update**: Books marked unavailable when copies reach 0

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **React Icons**: Consistent iconography throughout the application
- **Toast Notifications**: Success and error messages for all actions
- **Loading States**: Smooth loading indicators for better UX

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **RTK Query**: Efficient API state management with caching
- **React Router**: Client-side routing with navigation
- **Form Validation**: Client-side validation with error handling
- **Optimistic Updates**: Immediate UI feedback for better UX

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Notifications**: React Toastify
- **HTTP Client**: RTK Query (built-in fetch)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔗 Backend Integration

This frontend connects to a Node.js/Express backend with MongoDB. Make sure your backend is running on `http://localhost:5000` or update the API base URL in `src/redux/features/api.ts`.

### Required Backend Endpoints:
- `GET /api/books` - Get all books with optional filters
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `POST /api/borrow` - Borrow a book
- `GET /api/borrow` - Get borrow summary

## 📱 Pages & Routes

- `/` - Redirects to `/books`
- `/books` - Main book list with actions
- `/create-book` - Add new book form
- `/books/:id` - Book details view
- `/edit-book/:id` - Edit book form
- `/borrow/:bookId` - Borrow book form
- `/borrow-summary` - Borrow summary dashboard

## 🎯 Key Components

### Pages
- `BookList` - Main books table with search and filters
- `CreateBook` - Add new book form
- `EditBook` - Edit existing book form
- `BookDetails` - Comprehensive book information view
- `BorrowBook` - Borrow book form
- `BorrowSummary` - Aggregated borrowing data

### Components
- `Navbar` - Responsive navigation with mobile menu
- `Footer` - Site footer with credits
- `BookForm` - Reusable form for creating/editing books
- `BorrowForm` - Form for borrowing books
- `LoadingSpinner` - Loading indicator component
- `ConfirmDialog` - Confirmation dialog for destructive actions

## 🎨 Styling

The application uses Tailwind CSS v4 for styling with:
- Responsive design patterns
- Consistent color scheme
- Modern UI components
- Hover and focus states
- Mobile-first approach

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── redux/              # Redux store and API
│   ├── app/           # Store configuration
│   └── features/      # RTK Query API slice
├── types/              # TypeScript type definitions
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

### Recommended Hosting
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
