import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseProps {
  password: string;
  name: string;
  email: string;
}

export async function registerUseCase({
  password,
  name,
  email,
}: RegisterUseCaseProps) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("User already exists");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}
