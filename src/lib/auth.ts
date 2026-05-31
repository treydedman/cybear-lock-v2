import jwt from "jsonwebtoken";
import { ClientError } from "./errors";

const secret = process.env.TOKEN_SECRET ?? "";
if (!secret) throw new Error("TOKEN_SECRET not found in env");

export type AuthUser = {
  userId: number;
  email: string;
  username: string;
};

export function verifyToken(authHeader: string | null): AuthUser {
  const token = authHeader?.split("Bearer ")[1];
  if (!token) throw new ClientError(401, "authentication required");
  return jwt.verify(token, secret) as AuthUser;
}

export function signToken(payload: AuthUser): string {
  return jwt.sign(payload, secret);
}
