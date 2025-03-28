import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { ConnectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  ConnectDB();
});
