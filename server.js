import "express-async-errors"; //Handles async errors without server being crashed
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import connectDB from "./connectDB.js";

//public
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5100;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist" )));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "test message" });
});

// JOB ROUTER
app.use("/api/v1/jobs", authenticateUser, jobRouter);

// USER ROUTER
app.use("/api/v1/users", authenticateUser, userRouter);

// ROUTE FOR LOGIN AND REGISTER
app.use("/api/v1/auth", authRouter);

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"client/dist","index.html"))
})

// NOT FOUND
app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

// ERROR ROUTE
app.use(errorHandlerMiddleware);


try {
  await connectDB(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}..`);
  });
} catch (error) {
  console.log(error);
}
