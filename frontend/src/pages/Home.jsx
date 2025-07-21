// // src/pages/Home.jsx

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axiosInstance";
// import Spinner from "../components/Spinner";
// import BooksTable from "../components/home/BooksTable";
// import BooksCard from "../components/home/BooksCard";
// import { MdOutlineAddBox } from "react-icons/md";

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showType, setShowType] = useState("table");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get("/books");
//         setBooks(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch books:", error);
//         if (error.response && error.response.status === 401) {
//           localStorage.clear(); // Clear invalid token
//           navigate("/signin"); // Redirect to sign-in
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [navigate]);

//   return (
//     <div className="p-4">
//       {/* Toggle Buttons */}
//       <div className="flex justify-center items-center gap-x-4">
//         <button
//           className={`bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ${
//             showType === "table" ? "font-bold" : ""
//           }`}
//           onClick={() => setShowType("table")}
//         >
//           Table
//         </button>
//         <button
//           className={`bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ${
//             showType === "card" ? "font-bold" : ""
//           }`}
//           onClick={() => setShowType("card")}
//         >
//           Card
//         </button>
//       </div>

//       {/* Header and Action Buttons */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl my-8 font-semibold">Books List</h1>
//         <div className="flex items-center gap-4">
//           <Link to="/books/import">
//             <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//               Import
//             </button>
//           </Link>
//           <Link to="/books/create">
//             <MdOutlineAddBox className="text-sky-800 text-4xl hover:scale-110 transition" />
//           </Link>
//         </div>
//       </div>

//       {/* Conditional Rendering: Spinner / Table / Card */}
//       {loading ? (
//         <Spinner />
//       ) : showType === "table" ? (
//         <BooksTable books={books} />
//       ) : (
//         <BooksCard books={books} />
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../components/Spinner";
import BooksTable from "../components/Home/BooksTable";
import BooksCard from "../components/Home/BooksCard";
import { MdOutlineAddBox } from "react-icons/md";
import { TbBook2 } from "react-icons/tb";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  // Sorting
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/books");
        setBooks(response.data.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [navigate]);

  // 🔍 Filter + Sort
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const aVal = a[sortBy]?.toString().toLowerCase();
    const bVal = b[sortBy]?.toString().toLowerCase();
    return sortOrder === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  // 📄 Pagination
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, showType, sortBy, sortOrder]);

  // 💾 Export CSV
  const exportToCSV = () => {
    const headers = ["Title", "Author", "Publish Year"];
    const rows = filteredBooks.map((book) => [
      book.title,
      book.author,
      book.publishYear,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "books_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-white via-sky-50 to-sky-100 text-gray-800">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-700 text-white p-6 rounded-xl shadow-md mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">📚 Your Book Collection</h1>
          <p className="text-sm mt-1">
            Manage, view, and explore your library effortlessly.
          </p>
        </div>
        <TbBook2 className="text-5xl opacity-80 hidden md:block" />
      </div>

      {/* Toggle + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-x-4">
          <button
            className={`transition px-5 py-2 rounded-full shadow-sm ${
              showType === "table"
                ? "bg-sky-600 text-white"
                : "bg-white border border-sky-400 text-sky-600"
            }`}
            onClick={() => setShowType("table")}
          >
            Table View
          </button>
          <button
            className={`transition px-5 py-2 rounded-full shadow-sm ${
              showType === "card"
                ? "bg-sky-600 text-white"
                : "bg-white border border-sky-400 text-sky-600"
            }`}
            onClick={() => setShowType("card")}
          >
            Card View
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
        />
      </div>

      {/* Sort + Export */}
      <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold px-3 py-2 text-sm rounded shadow focus:outline-none"
          >
            <option value="title">Title</option>
            <option value="publishYear">Publish Year</option>
          </select>
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold px-3 py-2 rounded shadow hover:brightness-110 transition"
          >
            {sortOrder === "asc" ? "▲ Asc" : "▼ Desc"}
          </button>
        </div>

        <button
          onClick={exportToCSV}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md text-sm"
        >
          ⬇ Export CSV
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Books List</h2>
        <div className="flex items-center gap-3">
          <Link to="/books/import">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md">
              + Import Books
            </button>
          </Link>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl hover:scale-110 transition" />
          </Link>
        </div>
      </div>

      {/* Book View */}
      <div className="mt-4">
        {loading ? (
          <Spinner />
        ) : sortedBooks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No books found.
          </p>
        ) : showType === "table" ? (
          <div className="overflow-x-auto">
            <BooksTable books={currentBooks} />
          </div>
        ) : (
          <BooksCard books={currentBooks} />
        )}
      </div>

      {/* Pagination */}
      {sortedBooks.length > booksPerPage && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-sky-300 hover:bg-sky-400 text-white rounded disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-sky-300 hover:bg-sky-400 text-white rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
