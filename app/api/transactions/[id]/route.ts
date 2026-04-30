import { prisma } from "@/lib/prisma";
import { parseNumber } from "@/utils/formatters";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: rawId } = await params;
    const body = await req.json();
    const id = parseInt(rawId);

    const cleanNominal =
      typeof body.nominal === "string"
        ? parseNumber(body.nominal)
        : Number(body.nominal);

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        currentAmount:
          body.newAmount !== undefined ? body.newAmount : undefined,
        isWithdrawn:
          body.isWithdrawn !== undefined ? body.isWithdrawn : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update data" }, { status: 500 });
  }
}
