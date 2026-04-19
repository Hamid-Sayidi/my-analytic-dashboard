import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const id = parseInt(params.id);

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        deskripsi: body.deskripsi,
        nominal: Number(body.nominal),
        tipe: body.tipe,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update data" }, { status: 500 });
  }
}
