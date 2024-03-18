import express from "express";
import cors from "cors";
import { roomsRouter } from "./routes/rooms.routes";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", roomsRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    status: "ERROR",
    message: error.message || "An error occurred.",
  });
});

// Catch-all route for unexisting endpoints
app.use("*", (req, res, next) => {
  res.status(404).send({
    status: "FAIL",
    data: null,
    message: "Resource not found.",
  });
});

app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
