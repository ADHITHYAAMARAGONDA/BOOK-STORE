// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

// const BooksTable = ({ books }) => {
//   return (
//     <table className="w-full border-separate border-spacing-2">
//       <thead>
//         <tr>
//           <th className="border border-slate-600 rounded-md">No</th>
//           <th className="border border-slate-600 rounded-md">Title</th>
//           <th className="border border-slate-600 rounded-md max-md:hidden">
//             Author
//           </th>
//           <th className="border border-slate-600 rounded-md max-md:hidden">
//             Publish Year
//           </th>
//           <th className="border border-slate-600 rounded-md">Operations</th>
//         </tr>
//       </thead>
//       <tbody>
//         {books.map((book, index) => (
//           <tr key={book._id} className="h-8">
//             <td className="border border-slate-700 rounded-md text-center">
//               {index + 1}
//             </td>
//             <td className="border border-slate-700 rounded-md text-center">
//               {book.title}
//             </td>
//             <td className="border border-slate-700 rounded-md text-center max-md:hidden">
//               {book.author}
//             </td>
//             <td className="border border-slate-700 rounded-md text-center max-md:hidden">
//               {book.publishYear}
//             </td>
//             <td className="border border-slate-700 rounded-md text-center">
//               <div className="flex justify-center gap-x-4">
//                 <Link to={`/books/details/${book._id}`}>
//                   <BsInfoCircle className="text-2xl text-green-800" />
//                 </Link>
//                 <Link to={`/books/edit/${book._id}`}>
//                   <AiOutlineEdit className="text-2xl text-yellow-600" />
//                 </Link>
//                 <Link to={`/books/delete/${book._id}`}>
//                   <MdOutlineDelete className="text-2xl text-red-600" />
//                 </Link>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default BooksTable;

// src/components/home/BooksTable.jsx

import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  if (!books.length) {
    return (
      <div className="text-center text-gray-500 mt-10 text-lg">
        No books found. Try importing or adding new ones.
      </div>
    );
  }

  return (
    <table className="min-w-full border border-gray-200 shadow-md rounded-xl overflow-hidden text-sm bg-white">
      <thead className="bg-sky-100 text-sky-900 uppercase text-sm font-semibold">
        <tr>
          <th className="px-6 py-3 text-left">No</th>
          <th className="px-6 py-3 text-left">Title</th>
          <th className="px-6 py-3 text-left max-md:hidden">Author</th>
          <th className="px-6 py-3 text-left max-md:hidden">Year</th>
          <th className="px-6 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {books.map((book, index) => (
          <tr
            key={book._id}
            className="hover:bg-sky-50 border-b border-gray-100 transition"
          >
            <td className="px-6 py-4">{index + 1}</td>
            <td className="px-6 py-4">{book.title}</td>
            <td className="px-6 py-4 max-md:hidden">{book.author}</td>
            <td className="px-6 py-4 max-md:hidden">{book.publishYear}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-xl text-green-700 hover:text-green-900 transition" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-xl text-yellow-600 hover:text-yellow-800 transition" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-xl text-red-600 hover:text-red-800 transition" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
