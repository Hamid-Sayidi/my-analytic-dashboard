"use client";

import { useState } from "react";
import useSWR from "swr";
import { Text, Flex, Button } from "@tremor/react";
import TransactionDialog from "@/components/ui/transactionDialog";
import TransactionTable from "@/components/table/transactionTable";
import FinancialChart from "@/components/charts/FinancialChart";
import StatsGrid from "@/components/statsgrid";

// const data = [
//   { bulan: "Jan", Nominal: 2890 },
//   { bulan: "Feb", Nominal: 2756 },
//   { bulan: "Mar", Nominal: 3322 },
//   { bulan: "Apr", Nominal: 3470 },
//   { bulan: "Mei", Nominal: 3475 },
//   { bulan: "Jun", Nominal: 3129 },
// ];

// interface Transactions {
//   id: string;
//   description: string;
//   amount: number;
//   createdAt: string;
// }

// const transactions = [
//   { deskripsi: "Bayar Listrik", tanggal: "2024-06-21", nominal: 150000 },
//   {
//     deskripsi: "Pembelian di Tokopedia",
//     tanggal: "2024-06-13",
//     nominal: 250000,
//   },
//   { deskripsi: "Gaji Bulanan", tanggal: "2024-06-05", nominal: 5000000 },
//   { deskripsi: "Makan di Restoran", tanggal: "2024-06-02", nominal: 120000 },
//   {
//     deskripsi: "Belanja di Supermarket",
//     tanggal: "2024-06-01",
//     nominal: 300000,
//   },
// ];

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: transactions,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/transactions", fetcher);

  if (error) return <div className="p-8 text-white">Gagal Memuat</div>;
  if (!transactions) return <div className="p-8 text-white">loading...</div>;

  return (
    <main className="p-8 bg-slate-950 min-h-screen">
      <Flex justifyContent="between" alignItems="center" className="mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white"> Dashboard Keuangan</h1>
          <Text className="text-slate-400">
            {" "}
            Monitoring keuangan Anda secara real-time{" "}
          </Text>
        </div>
        <Button
          variant="primary"
          className="bg-blue-600 border-none hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          Tambah Transaksi
        </Button>
      </Flex>

      <StatsGrid />
      <div className="my-8">
        {" "}
        <FinancialChart />
        <TransactionTable transactions={transactions} />
      </div>
      <TransactionDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refreshData={mutate}
      />
    </main>
  );
}
