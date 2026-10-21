import { PrismaClient } from "@prisma/client";
import { CreateExerciseInput } from "../validators/exercise.validator.js";

const prisma = new PrismaClient();

export class ExerciseService {
  // Получить все упражнения
  static async getAllExercises() {
    return await prisma.exercise.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // Создать новое упражнение
  static async createExercise(data: CreateExerciseInput) {
    return await prisma.exercise.create({
      data,
    });
  }
}
