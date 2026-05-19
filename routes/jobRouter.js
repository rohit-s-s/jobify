import { Router } from "express";
import {
  createJobs,
  deleteJobs,
  getAllJobs,
  getJobById,
  showStatus,
  updateJobs,
} from "../controllers/jobController.js";
import {
  validateIdParam,
  validateJobInputs,
} from "../middleware/validationMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(getAllJobs).post(checkTestUser,validateJobInputs, createJobs);

router.route("/stats").get(showStatus)

router
  .route("/:id")
  .get(validateIdParam, getJobById)
  .patch(checkTestUser,validateJobInputs,validateIdParam,  updateJobs)
  .delete(checkTestUser,validateIdParam,  deleteJobs);

export default router;
