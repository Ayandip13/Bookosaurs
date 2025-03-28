const express = require("express");
import cloudinary from "../lib/cloudiary";
import Book from "../models/Book.model";

const router = express.Router();

router.post("/", async (req, res) => {
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
      // user: req.user._id
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book ", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
