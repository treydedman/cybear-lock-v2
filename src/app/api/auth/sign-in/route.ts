import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import db from "@/lib/db";
import { ClientError } from "@/lib/errors";
import { signToken } from "@/lib/auth";

type User = {
  userId: number;
  email: string;
  username: string;
  hashedPassword: string;
};

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();
    if (!identifier || !password) {
      throw new ClientError(400, "Email or username and password are required");
    }

    const sql = `
      select "userId", "email", "username", "hashedPassword"
      from "users"
      where "email" = $1 or "username" = $1;
    `;

    const result = await db.query<User>(sql, [identifier]);
    const user = result.rows[0];

    if (!user) throw new ClientError(401, "Invalid email or username");

    const isValidPassword = await argon2.verify(user.hashedPassword, password);
    if (!isValidPassword) throw new ClientError(401, "Invalid password");

    const payload = {
      userId: user.userId,
      email: user.email,
      username: user.username,
    };

    const token = signToken(payload);

    return NextResponse.json({ token, user: payload }, { status: 200 });
  } catch (err) {
    if (err instanceof ClientError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
