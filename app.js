import express from "express";
import cors from "cors";
import connectDB from "./db/mongoose.js";
import { roomsRouter } from "./routes/rooms.routes.js";
import { statusCode } from "./utils/httpStatusCode.js";
import { roomTypesRouter } from "./routes/roomtypes.routes.js";
const { FAIL, ERROR } = statusCode;

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/roomsTypes", roomTypesRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText,
    message: error.message,
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
  connectDB();
  console.log(`The app is running on port ${port}`);
});
