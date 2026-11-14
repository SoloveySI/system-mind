import { Request, Response, NextFunction } from "express";
import { CatalogService } from "../services/catalog.service.js";

export class CatalogController {
  static async getBlocks(req: Request, res: Response, next: NextFunction) {
    try {
      const blocks = await CatalogService.getBlocks();
      return res.status(200).json(blocks);
    } catch (error) {
      next(error);
    }
  }

  static async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: "Некорректный номер упражнения" });
      }

      const task = await CatalogService.getTask(id);
      if (!task) {
        return res.status(404).json({ error: "Упражнение не найдено" });
      }
      return res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
}
