"use client";

import { createTransaction } from "@/app/actions/route";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { Button, Dialog, DialogPanel, Text, TextInput } from "@tremor/react";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  refreshData: () => void;
}
export default function TransactionDialog({
  isOpen,
  setIsOpen,
  refreshData,
}: Props) {
  const { mutate } = useSWRConfig();
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerSimpan = async () => {
    if (!desc || !amount) return;

    setLoading(true);
    try {
      await createTransaction(desc, Number(amount));

      setDesc("");
      setAmount("");
      setIsOpen(false);
      refreshData();

      mutate("api/transactions");
    } catch (err) {
      console.log("Gagal menambahkan transaksi", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
      <DialogPanel className="bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-6">
          Tambah Transaksi
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
              Simpan
            </Button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
