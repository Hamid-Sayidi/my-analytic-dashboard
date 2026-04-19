"use client";

import { useState } from "react";
import useSWR from "swr";
import { Text, Flex, Button } from "@tremor/react";
import TransactionDialog from "@/components/ui/transactionDialog";
import TransactionTable from "@/components/table/transactionTable";
import FinancialChart from "@/components/charts/FinancialChart";
import StatsGrid from "@/components/statsgrid";
import { ApiResponse, Transaction } from "@/types/transaction";
import DreamCard from "@/components/dreamsavings/deramsavings";
import { DreamCardProps } from "@/types/transaction";
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

const fetcher = (url: string): Promise<ApiResponse> =>
  fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(
    "/api/transactions",
    fetcher,
  );

  const { data: dreams, mutate: mutateDreams } = useSWR<DreamCardProps[]>(
    "/api/dreams",
    fetcher,
  );

  const itemsPerPage = 5;

  const allTransactions = data?.transactions || [];
  const stats = data?.stats || {
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  };

  const handleEditClick = (item: Transaction) => {
    setSelectedTransaction(item);
    setIsOpen(true);
  };

  const filterData = allTransactions.filter((item: Transaction) => {
    const itemDate = new Date(item.tanggal);
    const isSameMonth =
      itemDate.getMonth() === selectedDate.getMonth() &&
      itemDate.getFullYear() === selectedDate.getFullYear();
    const matchesSearch = item.deskripsi.toLowerCase().includes(searchQuery);
    const matchesType = filterType === "all" || item.tipe === filterType;

    return isSameMonth && matchesSearch && matchesType;
  });

  const handlePrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)),
    );
  };
  const handleNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)),
    );
  };
  const currentMountLabel = selectedDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filterData.slice(
    indexOFirstItem,
    indexOfLastItem,
  );

  if (error) return <div className="p-8 text-white">Gagal Memuat</div>;
  if (isLoading) return <div className="p-8 text-white">loading...</div>;

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

      <StatsGrid
        balance={stats.totalBalance}
        income={stats.totalIncome}
        expense={stats.totalExpense}
      />
      <div className="my-8">
        <FinancialChart allTransactions={allTransactions} />
        <TransactionTable
          transactions={currentTransactions}
          onEdit={handleEditClick}
          searchQuery={searchQuery}
          setSearchQuery={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          filterType={filterType}
          setFilterType={(val) => {
            setFilterType(val);
            setCurrentPage(1);
          }}
          currentMonthLabel={currentMountLabel}
          handleNextMonth={handleNextMonth}
          handlePrevMonth={handlePrevMonth}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <TransactionDialog
        isOpen={isOpen}
        setIsOpen={(val) => {
          setIsOpen(val);
          if (!val) setSelectedTransaction(null);
        }}
        refreshData={mutate}
        editData={selectedTransaction}
      />
      {dreams?.map((dream: DreamCardProps) => (
        <DreamCard
          key={dream?.id}
          id={dream?.id}
          title={dream?.title}
          targetAmount={dream?.targetAmount}
          currentAmount={dream?.currentAmount}
          category={dream?.category}
          isCompelete={dream?.isCompelete}
        />
      ))}
    </main>
  );
}
