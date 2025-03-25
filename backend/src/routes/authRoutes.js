import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
  res.send("loggedin");
});

router.post("/register", async (req, res) => {
  res.send("Registered");
});

export default router;
