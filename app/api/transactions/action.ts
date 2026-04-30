import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { tanggal: "desc" },
    });

    const dreams = await prisma.dreamSavings.findMany();
    const totalLocked = dreams.reduce((acc, d) => acc + d.currentAmount, 0);

    const totalIncome = transactions
      .filter((t) => t.tipe === "Income")
      .reduce((acc, curr) => acc + curr.nominal, 0);

    const totalExpense = transactions
      .filter((t) => t.tipe === "Expense")
      .reduce((acc, curr) => acc + curr.nominal, 0);

    const totalBalance = totalIncome - totalExpense - totalLocked;

    return NextResponse.json({
      transactions,
      stats: { totalBalance, totalIncome, totalExpense, totalLocked },
    });
  } catch (error) {
    console.log("Gagal mengambil data transaksi", error);
    return NextResponse.json({ error: "Database lagi mogok" }, { status: 500 });
  }
}
