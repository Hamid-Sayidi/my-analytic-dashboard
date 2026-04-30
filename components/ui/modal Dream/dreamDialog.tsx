"use client";

import { useState, useTransition } from "react";
import {
  Button,
  TextInput,
  Title,
  Dialog,
  DialogPanel,
  Select,
  SelectItem,
  Text,
} from "@tremor/react";
import {
  PlusIcon,
  MinusIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { formatNumber, parseNumber } from "@/utils/formatters";
import { useRouter } from "next/navigation";

export default function DreamDialog({ refreshData }: { refreshData?: any }) {
  const [isIsOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();
  const [displayAmount, setDisplayAmount] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: 0,
    category: "Personal",
  });

  const handleStep = (type: "plus" | "minus") => {
    const step = 10000;
    const current = formData.targetAmount;
    const nextValue =
      type === "plus" ? Number(current) + step : Math.max(0, current - step);
    setFormData({ ...formData, targetAmount: nextValue });
    setDisplayAmount(formatNumber(String(nextValue)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || formData.targetAmount <= 0) {
      alert("Harap isi semua data");
      return;
    }

    startTransaction(async () => {
      try {
        const res = await fetch("/api/dreams", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        });

        if (res.ok) {
          setIsOpen(false);
          refreshData?.();
          setFormData({ title: "", targetAmount: 0, category: "Personal" });
          setDisplayAmount("");
          router.refresh();
        } else {
          const errorMsg = await res.json();
          alert("Gagal membuat impian baru");
        }
      } catch (err) {
        console.error("Fetch error :", err);
        alert("Gagal membuat impian baru");
      }
    });
  };

  return (
    <>
      <Button
        size="lg"
        color="emerald"
        icon={PlusIcon}
        onClick={() => setIsOpen(true)}
        className="rounded-xl"
      >
        Impian Baru
      </Button>

      <Dialog open={isIsOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md overflow-visible">
          <Title className="text-white text-xl">Buat Impian Baru ✨</Title>
          <Text className="text-slate-400 mt-2">
            Apa yang ingin kamu capai selanjutnya?
          </Text>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Text className="text-slate-300 mb-1 text-xs uppercase font-bold">
                Nama Impian
              </Text>
              <TextInput
                placeholder="Masukkan nama impian"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Text className="text-slate-300 mb-1 text-xs uppercase font-bold">
                Target Amount
              </Text>
              <div className="flex gap-2">
                <TextInput
                  placeholder="Contoh: 100.000"
                  value={displayAmount}
                  onChange={(e) => {
                    const val = e.currentTarget.value;
                    const formatted = formatNumber(val);
                    setDisplayAmount(formatted);
                    setFormData({
                      ...formData,
                      targetAmount: parseNumber(formatted),
                    });
                  }}
                  required
                />
                <div className="flex border border-slate-700 rounded-md overflow-hidden shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStep("minus")}
                    className="px-3 bg-slate-800 hover:bg-slate-700 border-r border-slate-700 text-white transition-colors"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStep("plus")}
                    className="px-3 bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  >
                    <PlusSmallIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <Text className="text-slate-300 mb-1 text-xs uppercase font-bold">
                Kategori
              </Text>
              <Select
                value={formData.category}
                onValueChange={(v) => setFormData({ ...formData, category: v })}
              >
                <SelectItem
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200"
                  value="Personal"
                >
                  Personal
                </SelectItem>
                <SelectItem
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200"
                  value="Keluarga"
                >
                  Keluarga
                </SelectItem>
                <SelectItem
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200"
                  value="Pendidikan"
                >
                  Pendidikan
                </SelectItem>
                <SelectItem
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200"
                  value="Liburan"
                >
                  Liburan
                </SelectItem>
                <SelectItem
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200"
                  value="Lainnya"
                >
                  Lainnya
                </SelectItem>
              </Select>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="secondary"
                color="red"
                className="flex-1 py-2"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button
                className="flex-1 py-2 bg-emerald-600 border-none"
                loading={isPending}
                type="submit"
              >
                Simpan Impian
              </Button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
