import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { ClientError } from "@/lib/errors";
import { verifyToken } from "@/lib/auth";
import { encrypt } from "@/lib/cipher";

export async function PUT(
  req: NextRequest,
  { params }: { params: { entryId: string } },
) {
  try {
    const user = verifyToken(req.headers.get("authorization"));
    const { entryId } = params;
    const { password } = await req.json();

    if (!password) throw new ClientError(400, "Password is required");

    const encryptedPassword = encrypt(password);

    const sql = `
      update "passwordEntries"
      set "encryptedPassword" = $1
      where "userId" = $2 and "entryId" = $3
      returning "website", "accountUsername", "updatedAt";
    `;

    const result = await db.query(sql, [
      encryptedPassword,
      user.userId,
      entryId,
    ]);

    if (result.rowCount === 0)
      throw new ClientError(404, "Password entry not found");

    return NextResponse.json(result.rows[0]);
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { entryId: string } },
) {
  try {
    const user = verifyToken(req.headers.get("authorization"));
    const entryId = Number(params.entryId);

    if (isNaN(entryId)) throw new ClientError(400, "Invalid entry ID");

    const sql = `
      delete from "passwordEntries"
      where "entryId" = $1 and "userId" = $2
      returning *;
    `;

    const result = await db.query(sql, [entryId, user.userId]);

    if (result.rowCount === 0)
      throw new ClientError(404, "Password entry not found");

    return NextResponse.json({
      message: "Password entry deleted successfully",
    });
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
