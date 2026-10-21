import { Router } from "express";
import { ExerciseController } from "../controllers/exercise.controller.js";
import { validate } from "../middleware/validate.js";
import { createExerciseSchema } from "../validators/exercise.validator.js";

const router = Router();

router.get("/exercises", ExerciseController.getAll);
router.post(
  "/exercises",
  validate(createExerciseSchema),
  ExerciseController.create,
);

export { router as exerciseRoutes };
