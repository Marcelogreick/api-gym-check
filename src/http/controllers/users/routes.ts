import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { profile } from "./profile";
import { authenticate } from "./authenticate";
import { register } from "./register";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticate

  app.get("/me", { onRequest: verifyJwt }, profile);
}
