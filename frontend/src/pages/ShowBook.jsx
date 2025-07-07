import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!book) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading book details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          📖 {book.title}
        </h2>
        <div className="text-gray-700 space-y-3">
          <p>
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p>
            <span className="font-semibold">Published Year:</span>{" "}
            {book.publishYear}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(book.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
