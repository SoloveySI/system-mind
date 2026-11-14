import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";

// Код гостя: случайный UUID, который браузер создаёт сам и хранит у себя
const GUEST_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Определяет гостя по коду из заголовка x-guest-id и при необходимости создаёт его в базе
export async function resolveGuest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const guestId = req.header("x-guest-id");
    if (!guestId || !GUEST_ID_PATTERN.test(guestId)) {
      return res.status(400).json({ error: "Не передан корректный код гостя" });
    }

    const email = `guest-${guestId.toLowerCase()}@ratium.local`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, name: "Гость" },
    });

    res.locals.userId = user.id;
    next();
  } catch (error) {
    next(error);
  }
}
