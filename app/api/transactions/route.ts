import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { tanggal: "desc" },
    });

    const totalIncome = transactions
      .filter((t) => t.tipe === "Income")
      .reduce((acc, curr) => acc + curr.nominal, 0);

    const totalExpense = transactions
      .filter((t) => t.tipe === "Expense")
      .reduce((acc, curr) => acc + curr.nominal, 0);

    const totalBalance = totalIncome - totalExpense;

    return NextResponse.json({
      transactions,
      stats: { totalBalance, totalIncome, totalExpense },
    });
  } catch (error) {
    console.log("Gagal mengambil data transaksi", error);
    return NextResponse.json({ error: "Database lagi mogok" }, { status: 500 });
  }
}
