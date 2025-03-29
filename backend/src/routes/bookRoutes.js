const express = require("express");
import cloudinary from "../lib/cloudiary";
import Book from "../models/Book.model";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!image || !title || !caption || !rating)
      return res.status(400).json({ message: "Please Provide all fields" });

    //upload them on cloudinary

    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;
    //save to the database

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book ", error);
    res.status(500).json({ message: error.message });
  }
});

//pagination => infinite loading...

router.get("", protectRoute, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    //Book.find() is a Mongoose query that retrieves all documents from the books collection.
    const books = await Book.find()
      .sort({ createdAt: -1 }) // Sort books by newest first (descending order)
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage"); //Retrieves only the "username" and "profileImage" fields from the user(field from Book schema) collection.

    const totalBooks = await Book.countDocuments();

    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error in get all books route", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
