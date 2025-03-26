import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });
    }

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should be at least 4 character long" });
    }

    //check if user already exist or not

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already exists" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // get random avatar
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`

    const user = new User({
      email,
      username,
      password,
      profileImage
    })

    await user.save()





  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  res.send("Registered");
});

export default router;
