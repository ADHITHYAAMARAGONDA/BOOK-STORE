// import { AiOutlineClose } from "react-icons/ai";
// import { PiBookOpenTextLight } from "react-icons/pi";
// import { BiUserCircle } from "react-icons/bi";

// const BookModal = ({ book, onClose }) => {
//   return (
//     <div
//       className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
//       onClick={onClose}
//     >
//       <div
//         onClick={(event) => event.stopPropagation()}
//         className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
//       >
//         <AiOutlineClose
//           className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
//           onClick={onClose}
//         />
//         <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
//           {book.publishYear}
//         </h2>
//         <h4 className="my-2 text-gray-500">{book._id}</h4>
//         <div className="flex justify-start items-center gap-x-2">
//           <PiBookOpenTextLight className="text-red-300 text-2xl" />
//           <h2 className="my-1">{book.title}</h2>
//         </div>
//         <div className="flex justify-start items-center gap-x-2">
//           <BiUserCircle className="text-red-300 text-2xl" />
//           <h2 className="my-1">{book.author}</h2>
//         </div>
//         <p className="mt-4">Anything You want to show</p>
//         <p className="my-2">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
//           voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
//           necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
//           nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
//           dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
//           vitae voluptate sequi repellat!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default BookModal;

import React from "react";

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-[500px]">
        <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
        <p className="mb-2">
          <span className="font-semibold text-gray-600">Author:</span>{" "}
          {book.author}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-gray-600">Year:</span>{" "}
          {book.publishYear}
        </p>
        <p className="mb-2 text-sm text-gray-500">ID: {book._id}</p>
        {/* Add more fields here if you have them */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
