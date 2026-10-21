import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
  // Получить всех пользователей
  async getAllUsers() {
    return await prisma.user.findMany();
  },

  // Создать нового пользователя
  async createUser(data: { email: string; name: string }) {
    return await prisma.user.create({
      data,
    });
  },
};
