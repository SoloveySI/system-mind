import { Router } from "express";
import { createItem } from "../controllers/item.controller.js";
import { validate } from "../middleware/validate.js";
import { createItemSchema } from "../validators/example.validator.js";

const router = Router();

router.post("/items", validate(createItemSchema), createItem);

export default router;
