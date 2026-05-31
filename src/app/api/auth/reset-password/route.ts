import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import db from "@/lib/db";
import { ClientError } from "@/lib/errors";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req.headers.get("authorization"));

    const { password } = await req.json();
    if (!password) throw new ClientError(400, "Password is required");

    const hashedPassword = await argon2.hash(password);

    const sql = `
      update "users"
      set "hashedPassword" = $1
      where "userId" = $2
      returning "userId", "username", "email", "createdAt";
    `;

    const result = await db.query(sql, [hashedPassword, user.userId]);

    if (!result.rows.length) throw new ClientError(404, "User not found");

    return NextResponse.json({ message: "Password updated successfully" });
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
