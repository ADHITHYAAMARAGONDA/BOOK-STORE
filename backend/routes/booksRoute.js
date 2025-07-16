import express from "express";
import { Book } from "../models/bookModel.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all books
router.get("/", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch books" });
  }
});

// GET single book by ID ✅
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch book" });
  }
});

// POST new book (from Import or Create)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newBook = await Book.create({ title, author, publishYear });
    res.status(201).json({ success: true, data: newBook });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid book data" });
  }
});

// PUT update book by ID ✅
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: "Update failed" });
  }
});

// DELETE book by ID ✅
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

export default router;
