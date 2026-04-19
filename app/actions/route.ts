"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTransaction(
  deskripsi: string,
  nominal: number,
  tipe: string,
) {
  try {
    await prisma.transaction.create({
      data: {
        deskripsi: deskripsi,
        nominal: nominal,
        tanggal: new Date(),
        tipe: tipe,
      },
    });

    revalidatePath("/");

    return { success: true };
  } catch (err) {
    console.log("Gagal menambahkan transaksi", err);
    throw new Error("Gagal menyimpan data");
  }
}

export async function deleteTransaction(id: number) {
  try {
    await prisma.transaction.delete({
      where: { id: id },
    });
    revalidatePath("/");
  } catch (err) {
    console.error("Gagal hapus : ", err);
    throw new Error("Gagal menghapus data");
  }
}
