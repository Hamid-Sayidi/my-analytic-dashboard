import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: rawId } = await params;
    const body = await req.json();
    const id = parseInt(rawId);

    const updated = await prisma.dreamSavings.update({
      where: { id },
      data: {
        currentAmount: body.newAmount,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = parseInt((await params).id);
    await prisma.dreamSavings.delete({
      where: { id },
    });
    revalidatePath("/");
    return NextResponse.json({ message: "Impian Dibaatalkan" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal membatalkan impian" },
      { status: 500 },
    );
  }
}
