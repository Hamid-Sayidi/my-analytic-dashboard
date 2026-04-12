import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { tanggal: "desc" },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.log("Gagal mengambil data transaksi", error);
    return NextResponse.json({ error: "Database lagi mogok" }, { status: 500 });
  }
}
