import { Request, Response } from "express";
import * as healthService from "../services/health.service.js";

export const checkHealth = (req: Request, res: Response) => {
  const healthData = healthService.getHealthStatus();
  res.json(healthData);
};
