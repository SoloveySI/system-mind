import { Request, Response } from "express";

export const createItem = (req: Request, res: Response) => {
  const { name, age } = req.body;

  res.status(201).json({
    status: "success",
    message: "Элемент успешно создан!",
    data: { name, age },
  });
};
