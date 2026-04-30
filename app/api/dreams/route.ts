import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dreams = await prisma.dreamSavings.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(dreams);
  } catch (err) {
    return NextResponse.json({ error: "Database lagi mogok" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Data masuk ke API:", body);
    const { title, targetAmount, category } = body;
    const newDreams = await prisma.dreamSavings.create({
      data: {
        title,
        targetAmount: Number(targetAmount),
        currentAmount: 0,
        category: category || "Umum",
        isComplete: false,
      },
    });
    return NextResponse.json(newDreams, {
      status: 201,
    });
  } catch (err) {
    console.error("DEBUG ERROR PRISMA:", err);
    return NextResponse.json(
      {
        error: "Database lagi mogok",
      },
      { status: 500 },
    );
  }
}
