import { Router } from "express";
import { SubmissionController } from "../controllers/submission.controller.js";
import { resolveGuest } from "../middleware/guest.middleware.js";

const router = Router();

router.post("/tasks/:id/submit", resolveGuest, SubmissionController.submit);

export { router as submissionRoutes };
