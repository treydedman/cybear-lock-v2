import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { ClientError } from "@/lib/errors";
import { verifyToken } from "@/lib/auth";
import { encrypt } from "@/lib/cipher";

export async function GET(req: NextRequest) {
  try {
    const user = verifyToken(req.headers.get("authorization"));

    const sql = `
      select "entryId", "website", "accountUsername", "encryptedPassword", "category", "tags", "createdAt"
      from "passwordEntries"
      where "userId" = $1
      order by "website" asc, "accountUsername" asc;
    `;

    const result = await db.query(sql, [user.userId]);
    return NextResponse.json(result.rows);
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

export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req.headers.get("authorization"));

    const { website, username, password } = await req.json();
    if (!website || !username || !password) {
      throw new ClientError(400, "Credentials are required");
    }

    const encryptedPassword = encrypt(password);

    const sql = `
      insert into "passwordEntries" ("userId", "website", "accountUsername", "encryptedPassword")
      values ($1, $2, $3, $4)
      returning "website", "accountUsername", "createdAt";
    `;

    const result = await db.query(sql, [
      user.userId,
      website,
      username,
      encryptedPassword,
    ]);
    return NextResponse.json(result.rows[0], { status: 201 });
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
