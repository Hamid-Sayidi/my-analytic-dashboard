"use client";

import { createTransaction } from "@/app/actions/route";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogPanel, Text, TextInput } from "@tremor/react";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  refreshData: () => void;
  editData?: any;
}
export default function TransactionDialog({
  isOpen,
  setIsOpen,
  refreshData,
  editData = null,
}: Props) {
  const { mutate } = useSWRConfig();
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Expense");

  useEffect(() => {
    if (editData) {
      setDesc(editData.deskripsi || "");
      setAmount(editData.nominal?.toString() || "");
      setType(editData.tipe || "Expense");
    } else {
      setDesc("");
      setAmount("");
      setType("Expense");
    }
  }, [editData, isOpen]);

  const handlerSimpan = async () => {
    if (!desc || !amount) return;

    setLoading(true);
    try {
      if (editData) {
        const response = await fetch(`/api/transactions/${editData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deskripsi: desc,
            nominal: Number(amount),
            tipe: type,
          }),
        });

        if (!response.ok) throw new Error("Gagal update data");
      } else {
        await createTransaction(desc, Number(amount), type);
      }

      setDesc("");
      setAmount("");
      setIsOpen(false);
      refreshData();
      mutate("/api/transactions");
    } catch (err) {
      console.error("Gagal menyimpan transaksi:", err);
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
      <DialogPanel className="bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-6">
          {editData ? "Edit Transaksi" : "Tambah Transaksi"}
        </h3>
        <div className="space-y-6">
          <div>
            {" "}
            <Text className="text-slate-400 mb-1">Deskripsi</Text>
            <TextInput
              placeholder="Contoh : Kopi"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            {" "}
            <Text className="text-slate-400 mb-1">Nominal</Text>
            <TextInput
              type="number"
              placeholder="15000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tipe transaksi</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 bg-slate-800 border boder-slate-700 rounded-md"
            >
              <option value="Expense">Pengeluaran (Keluar)</option>
              <option value="Income">Pemasukan (Masuk)</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Batal
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={handlerSimpan}
              className="flex-1 border-blue-600 border-none hover:bg-blue-700"
            >
              {editData ? "Update" : "Simpan"}
            </Button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
