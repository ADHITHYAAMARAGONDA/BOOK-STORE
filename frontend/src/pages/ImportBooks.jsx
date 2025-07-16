// // src/pages/ImportBooks.jsx
// import React, { useState } from "react";
// import axios from "axios"; // ✅ For external API call
// import axiosInstance from "../utils/axiosInstance"; // ✅ JWT-protected backend requests
// import { useSnackbar } from "notistack";
// import BackButton from "../components/BackButton";
// import Spinner from "../components/Spinner";

// const ImportBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();

//   const fetchBooks = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         "https://www.googleapis.com/books/v1/volumes?q=javascript"
//       );
//       setBooks(res.data.items);
//     } catch (error) {
//       enqueueSnackbar("Failed to fetch books", { variant: "error" });
//     }
//     setLoading(false);
//   };

//   const handleImport = async (book) => {
//     const data = {
//       title: book.volumeInfo.title,
//       author: book.volumeInfo.authors?.[0] || "Unknown",
//       publishYear: book.volumeInfo.publishedDate?.slice(0, 4) || "2020",
//     };

//     try {
//       await axiosInstance.post("/books", data); // ✅ backend insert with token
//       enqueueSnackbar("Book imported successfully", { variant: "success" });
//     } catch (err) {
//       enqueueSnackbar("Import failed", { variant: "error" });
//       console.log(err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <BackButton />
//       <h1 className="text-3xl my-4">Import Books</h1>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={fetchBooks}
//       >
//         Load Books from API
//       </button>

//       {loading && <Spinner />}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//         {books.map((book) => (
//           <div key={book.id} className="border p-4 rounded shadow">
//             <h2 className="text-xl font-bold">{book.volumeInfo.title}</h2>
//             <p>Author: {book.volumeInfo.authors?.[0] || "Unknown"}</p>
//             <p>Published: {book.volumeInfo.publishedDate || "N/A"}</p>
//             <button
//               className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
//               onClick={() => handleImport(book)}
//             >
//               Import
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImportBooks;

// src/pages/ImportBooks.jsx
import React, { useState } from "react";
import axios from "axios"; // For fetching from Google Books API
import axiosInstance from "../utils/axiosInstance"; // For POSTing to your backend
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ImportBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=40"
      );
      setBooks(res.data.items || []);
    } catch (error) {
      enqueueSnackbar("Failed to fetch books", { variant: "error" });
    }
    setLoading(false);
  };

  const handleImport = async (book) => {
    const data = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.[0] || "Unknown",
      publishYear: book.volumeInfo.publishedDate?.slice(0, 4) || "2020",
    };

    try {
      await axiosInstance.post("/books", data);
      enqueueSnackbar("Book imported successfully", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Import failed", { variant: "error" });
      console.error("Import error:", err);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Import Books</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={fetchBooks}
      >
        Load Books from API
      </button>

      {loading && <Spinner />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">
              {book.volumeInfo.title || "Untitled"}
            </h2>
            <p>Author: {book.volumeInfo.authors?.[0] || "Unknown"}</p>
            <p>Published: {book.volumeInfo.publishedDate || "N/A"}</p>
            <button
              className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => handleImport(book)}
            >
              Import
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportBooks;
