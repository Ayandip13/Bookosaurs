// server.js
import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { ConnectDB } from "./lib/db.js";
import cors from "cors";
import job from "./lib/cron.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());
job.start();

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// connect first, then start server
const startServer = async () => {
  await ConnectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
};

startServer();
