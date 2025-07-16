// // backend/models/bookModel.js
// import mongoose from "mongoose";

// const bookSchema = mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: String,
//       required: true,
//     },
//     publishYear: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // ✅ Named export (Option A)
// export const Book = mongoose.model("Book", bookSchema);

// // OR you can use default export (Option B)
// // export default mongoose.model("Book", bookSchema);

// backend/models/bookModel.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String, // ✅ Changed from Number to String
      required: true,
    },
  },
  {
    timestamps: true, // ✅ Enables createdAt and updatedAt
  }
);

// ✅ Named export (Option A)
export const Book = mongoose.model("Book", bookSchema);
