// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../components/Spinner";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { MdOutlineAddBox } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
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
          localStorage.clear(); // Clear invalid token
          navigate("/signin"); // Redirect to sign-in
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  return (
    <div className="p-4">
      {/* Toggle Buttons */}
      <div className="flex justify-center items-center gap-x-4">
        <button
          className={`bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ${
            showType === "table" ? "font-bold" : ""
          }`}
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className={`bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ${
            showType === "card" ? "font-bold" : ""
          }`}
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      {/* Header and Action Buttons */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 font-semibold">Books List</h1>
        <div className="flex items-center gap-4">
          <Link to="/books/import">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Import
            </button>
          </Link>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl hover:scale-110 transition" />
          </Link>
        </div>
      </div>

      {/* Conditional Rendering: Spinner / Table / Card */}
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
