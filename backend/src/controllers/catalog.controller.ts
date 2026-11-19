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

      const variant =
        typeof req.query.variant === "string" ? req.query.variant : undefined;
      const result = await CatalogService.getTask(id, variant);

      if (result.status === "not_found") {
        return res.status(404).json({ error: "Упражнение не найдено" });
      }
      if (result.status === "bad_variant") {
        return res
          .status(400)
          .json({ error: "Неизвестный вариант упражнения" });
      }
      return res.status(200).json(result.task);
    } catch (error) {
      next(error);
    }
  }
}
