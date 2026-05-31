import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { ClientError } from "@/lib/errors";
import { verifyToken } from "@/lib/auth";

export async function DELETE(req: NextRequest) {
  try {
    const user = verifyToken(req.headers.get("authorization"));

    await db.query('DELETE FROM "passwordEntries" WHERE "userId" = $1', [
      user.userId,
    ]);

    await db.query('DELETE FROM "users" WHERE "userId" = $1', [user.userId]);

    return NextResponse.json({ message: "Account deleted successfully" });
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
