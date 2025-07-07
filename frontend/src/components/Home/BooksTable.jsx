import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const BooksTable = ({ books }) => {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">📚 Books List</h1>
      </div>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  No
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Publish Year
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book, index) => (
                <tr key={book._id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{book.author}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {book.publishYear}
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    <Link to={`/books/${book._id}`}>
                      <BsInfoCircle className="text-green-600 hover:scale-110 text-xl" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-yellow-500 hover:scale-110 text-xl" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-red-600 hover:scale-110 text-xl" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BooksTable;
