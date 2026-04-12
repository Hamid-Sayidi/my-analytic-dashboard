"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTransaction(deskripsi: string, nominal: number) {
  try {
    await prisma.transaction.create({
      data: {
        deskripsi: deskripsi,
        nominal: nominal,
        tanggal: new Date(),
      },
    });

    revalidatePath("/");

    return { success: true };
  } catch (err) {
    console.log("Gagal menambahkan transaksi", err);
    throw new Error("Gagal menyimpan data");
  }
}
