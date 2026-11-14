import { Router } from "express";
import { CatalogController } from "../controllers/catalog.controller.js";

const router = Router();

router.get("/blocks", CatalogController.getBlocks);
router.get("/tasks/:id", CatalogController.getTask);

export { router as catalogRoutes };
