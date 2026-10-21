import { Request, Response, NextFunction } from "express";
import { ExerciseService } from "../services/exercise.service.js";

export class ExerciseController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const exercises = await ExerciseService.getAllExercises();
      return res.status(200).json(exercises);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newExercise = await ExerciseService.createExercise(req.body);
      return res.status(201).json(newExercise);
    } catch (error) {
      next(error);
    }
  }
}
