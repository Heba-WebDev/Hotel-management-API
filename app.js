import express from "express";
import cors from "cors";
import { roomsRouter } from "./routes/rooms.routes";
import { ERROR, FAIL } from "./utils/httpStatusCode";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/rooms", roomsRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error: ", error);
  res.status(error?.statusCode || 500).json({
    status: ERROR,
    message: error.message || "An error occurred.",
  });
});

// Catch-all unexisting route
app.use("*", (req, res, next) => {
  res.status(404).send({
    status: FAIL,
    data: null,
    message: "Resource not found.",
  });
});

app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
