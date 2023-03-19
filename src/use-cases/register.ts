import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseProps {
  password: string;
  name: string;
  email: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ password, name, email }: RegisterUseCaseProps) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error("User already exists");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
