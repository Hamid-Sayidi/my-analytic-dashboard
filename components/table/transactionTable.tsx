"use client";
import { formatRupiah } from "@/utils/formatters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Card,
  TextInput,
  Button,
} from "@tremor/react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { deleteTransaction } from "@/app/actions/route";
import { TransactionTableProps, Transaction } from "@/types/transaction";

export default function TransactionTable({
  transactions,
  onEdit,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  currentPage,
  totalPages,
  setCurrentPage,
  currentMonthLabel,
  handleNextMonth,
  handlePrevMonth,
}: TransactionTableProps) {
  const handDelete = async (id: number) => {
    if (confirm("Yakin mau hapus transaksi ini ? ")) {
      await deleteTransaction(id);
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800 ring-0 mt-8 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-medium text-white mb-4 whitespace-nowrap">
          Transaksi Terbaru
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="w-full sm:w-72">
            <TextInput
              icon={() => <span className="ml-2">🔍</span>}
              placeholder="Cari transaksi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border-slate-800 text-white"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-md text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Tipe</option>
              <option value="Income">Pemasukan</option>
              <option value="Expense">Pengeluaran</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={handlePrevMonth}
              className="bg-slate-800 border-none hover:bg-slate-700 p-2"
            >
              {"<"}
            </Button>
            <h2 className="text-xl font-semibold text-white min-w:150px text-center">
              {currentMonthLabel}
            </h2>
            <Button
              variant="secondary"
              onClick={handleNextMonth}
              className="bg-slate-800 border-none hover:bg-slate-700 p-2"
            >
              {">"}
            </Button>
          </div>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow className="border-b border-slate-800">
            <TableHeaderCell className="text-slate-400">
              Deskripsi
            </TableHeaderCell>
            <TableHeaderCell className="text-slate-400">
              Tanggal
            </TableHeaderCell>
            <TableHeaderCell className="text-slate-400">
              Nominal
            </TableHeaderCell>
            <TableHeaderCell className="text-slate-400 text-right">
              Aksi
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((item: Transaction) => (
            <TableRow key={item.id} className="border-b border-slate-800">
              <TableCell className="text-white">
                {item.deskripsi}
                <span
                  className={`ml-2 px-2 py-0.5 rounded text-[10px] ${
                    item.tipe === "Income"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {item.tipe}
                </span>
              </TableCell>
              <TableCell className="text-slate-400">
                {new Date(item.tanggal).toLocaleDateString("id-ID")}
              </TableCell>
              <TableCell className="text-white font-mono">
                {formatRupiah(item.nominal)}
              </TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handDelete(item.id)}
                  className="p-2 color: var(--color-slate-500) hover: text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                  title="Hapus Transaksi"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-800">
        <p className="text-sm text-slate-400">
          Halaman <span className="text-white">{currentPage}</span> dari{" "}
          <span className="text-white">{totalPages}</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-slate-800 text-white rounded-md disabled:opacity-50 hover:bg-slate-700 transition-all"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || currentPage === 0}
            className="px-4 py-2 bg-slate-800 text-white rounded-md disabled:opacity-50 hover:bg-slate-700 transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}
