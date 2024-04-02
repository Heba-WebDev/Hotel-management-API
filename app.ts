import express, {Request, Response, NextFunction } from "express";
import cors from "cors";
import { CustomError } from "./interfaces/customError";
import connectDB from "./db/mongoose.js";


// import { roomsRouter } from "./routes/rooms.routes";
// import { roomTypesRouter } from "./routes/roomtypes.routes";
// import { userRouter } from "./routes/users.routes";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/rooms", roomsRouter);
// app.use("/api/v1/roomsTypes", roomTypesRouter);

// Error handling middleware
app.use((error: CustomError, req: Request, res: Response, next: NextFunction): void => {
  res.status(error.statusCode || 500).json({
    status: error.statusText,
    message: error.message,
  });
});

// Catch-all unexisting route
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    status: "FAIL",
    data: null,
    message: "Resource not found.",
  });
});

app.listen(port, () => {
  connectDB();
  console.log(`The app is running on port ${port}`);
});
