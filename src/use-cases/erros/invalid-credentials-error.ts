export class InvalidCredentialsError extends Error {
  constructor() {
    super("User not found");
  }
}
