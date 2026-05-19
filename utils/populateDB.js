import { readFile } from "node:fs/promises";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import * as dotenv from "dotenv";
dotenv.config();

// try {
//   await mongoose.connect(process.env.MONGO_URL);
//   const user = await User.findOne({ email: "test@test.com" });
//   const jsonJobs = JSON.parse(
//     await readFile(new URL("./MOCK_DATA.json", import.meta.url))
//   );
//   const jobs = jsonJobs.map((job) => {
//     return { ...job, createdBy: user._id };
//   });
//   await Job.deleteMany({ createdBy: user._id });
//   await Job.create(jobs);
//   console.log("Demo data created");
//   process.exit(0);
// } catch (error) {
//   console.error(error);
//   process.exit(1);
// }

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "john@email.com" });
  if(!user) throw new Error("User not found")
  const jsonJobs = JSON.parse(
    await readFile(new URL("./MOCK_DATA.json", import.meta.url),"utf-8")
  );
  const jobs = jsonJobs.map((job) => (
    { ...job, createdBy: user._id }
  ));
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Demo data created");
  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
