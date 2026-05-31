import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import db from "@/lib/db";
import { ClientError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const { email, username, password } = await req.json();
    if (!email || !username || !password) {
      throw new ClientError(400, "Email, username and password are required");
    }

    const hashedPassword = await argon2.hash(password);

    const sql = `
      insert into "users" ("email", "username", "hashedPassword")
      values ($1, $2, $3)
      returning "userId", "email", "username", "createdAt";
    `;

    const result = await db.query(sql, [email, username, hashedPassword]);

    return NextResponse.json(
      {
        username: result.rows[0].username,
        email: result.rows[0].email,
      },
      { status: 201 },
    );
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
