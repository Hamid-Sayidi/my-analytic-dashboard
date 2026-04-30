"use client";

import { useState, useTransition } from "react";
import { formatRupiah, parseNumber, formatNumber } from "@/utils/formatters";
import {
  Card,
  Flex,
  Text,
  Badge,
  Metric,
  ProgressBar,
  Button,
  TextInput,
  Icon,
  Dialog,
  DialogPanel,
  Title,
} from "@tremor/react";
import { DreamCardProps } from "@/types/transaction";
import {
  BanknotesIcon,
  CheckCircleIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export default function DreamCard({
  id,
  title,
  targetAmount,
  currentAmount,
  category,
  refreshData,
}: DreamCardProps): React.ReactNode {
  const [isPending, startTransition] = useTransition();
  const [isAdding, setIsAdding] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayAmount, setDisplayAmount] = useState("");

  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const isActuallyCompleted = currentAmount >= targetAmount;
  const router = useRouter();

  const handleSave = async () => {
    const inputVal = parseNumber(amount);

    if (isNaN(inputVal) || inputVal <= 0) {
      alert("Masukkan nominal yang valid");
      return;
    }

    const sisaTarget = targetAmount - currentAmount;

    if (inputVal > sisaTarget) {
      alert(
        `Nominal terlalu besar! Sisa sisa target kamu hanya ${formatRupiah(sisaTarget)}`,
      );
      return;
    }

    const totalBaru = currentAmount + inputVal;

    try {
      const response = await fetch(`/api/dreams/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newAmount: totalBaru }),
      });

      if (response.ok) {
        setDisplayAmount("");
        setAmount("");
        setIsAdding(false);
        refreshData?.();
        mutate(`/api/transactions`);
        router.refresh();
      }
    } catch (error) {
      alert("Gagal menyimpan tabungan");
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dreams/${id}`, { method: "DELETE" });
      if (res.ok) {
        setIsDeleting(false);
        refreshData?.();
        mutate(`/api/transactions`);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className={`group relative bg-slate-900/60 backdrop-blur-sm p-6 rounded-3xl transition-all duration-300 ${
        isActuallyCompleted
          ? "border-2 border-emerald-500 shadow-lg shadow-emerald-900/40"
          : "border border-slate-800 hover:border-emerald-700/50"
      } ${isPending ? "opacity-50 pointer-events-none" : "opacity-100"}`}
    >
      <Flex justifyContent="between" alignItems="center">
        <Badge color={isActuallyCompleted ? "emerald" : "blue"} size="sm">
          {category || "Tercapai"}
        </Badge>
        {isActuallyCompleted ? (
          <Icon
            icon={CheckCircleIcon}
            color="emerald"
            variant="solid"
            tooltip="Tercapai"
          />
        ) : (
          <button
            onClick={() => setIsDeleting(true)}
            className="absolute top-4 right-4 text-slate-500 border border-slate-500 rounded-full p-2 hover:text-red-500 border-red-500 transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </Flex>

      <div className="mt-4">
        <Text className="text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
          {title}
        </Text>
        <Metric className="text-white text-2xl font-bold">
          {formatRupiah(currentAmount)}
        </Metric>
        <Text className="text-slate-500 text-sm">
          Target:{" "}
          <span className="text-slate-300 font-medium">
            {formatRupiah(targetAmount)}
          </span>
        </Text>
      </div>

      <div className="mt-6 space-y-2">
        <Flex className="text-xs text-slate-400">
          <span>Progress</span>
          <span
            className={`${isActuallyCompleted ? "text-emerald-500 font-bold" : ""}`}
          >
            {percentage.toFixed(1)}%
          </span>
        </Flex>
        <ProgressBar
          value={percentage}
          color={isActuallyCompleted ? "emerald" : "blue"}
          className="h-3 rounded-full"
        />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
        {!isAdding ? (
          <Button
            size="md"
            variant="secondary"
            color={isActuallyCompleted ? "emerald" : "blue"}
            icon={BanknotesIcon}
            onClick={() => setIsAdding(true)}
            disabled={isPending || isActuallyCompleted}
            className="w-full"
          >
            {isActuallyCompleted ? "Tabungan Sudah Cukup" : "Isi tabungan"}
          </Button>
        ) : (
          <div className="space-y-4">
            <TextInput
              type="text"
              placeholder="Nominal (misal: 100.000)"
              value={displayAmount}
              onChange={(e) => {
                const val = e.target.value;
                const formatted = formatNumber(val);
                setDisplayAmount(formatted);
                setAmount(formatted);
              }}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                size="xs"
                variant="secondary"
                color="red"
                className="flex-1"
                onClick={() => setIsAdding(false)}
              >
                Batal
              </Button>
              <Button
                size="xs"
                className="flex-1"
                onClick={handleSave}
                loading={isPending}
              >
                Simpan
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        static={true}
      >
        <DialogPanel className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm mx-auto">
          <div className="flex items-center justify-center w-12 h-12 bg-red-900/30 rounded-full mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
          </div>
          <Title className="text-lg text-center">Hapus Impian</Title>
          <Text className="text-slate-400 mt-2 text-center">
            Apakah kamu yakin ingin menghapus impian ini? Tindakan ini tidak
            dapat dibatalkan.
          </Text>
          <div className="flex gap-3 mt-8">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setIsDeleting(false)}
            >
              Batal
            </Button>
            <Button
              color="red"
              className="flex-1"
              loading={loading}
              onClick={handleDelete}
            >
              Ya, Hapus
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </Card>
  );
}
