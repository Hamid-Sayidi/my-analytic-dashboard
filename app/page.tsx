"use client";
import {
  Card,
  Metric,
  Text,
  Grid,
  BadgeDelta,
  Flex,
  AreaChart,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";

import { formatRupiah } from "@/utils/formatters";
import { format } from "path";

const data = [
  { bulan: "Jan", Nominal: 2890 },
  { bulan: "Feb", Nominal: 2756 },
  { bulan: "Mar", Nominal: 3322 },
  { bulan: "Apr", Nominal: 3470 },
  { bulan: "Mei", Nominal: 3475 },
  { bulan: "Jun", Nominal: 3129 },
];

const transactions = [
  { deskripsi: "Bayar Listrik", tanggal: "2024-06-01", nominal: 150000 },
  {
    deskripsi: "Pembelian di Tokopedia",
    tanggal: "2024-06-03",
    nominal: 250000,
  },
  { deskripsi: "Gaji Bulanan", tanggal: "2024-06-05", nominal: 5000000 },
  { deskripsi: "Makan di Restoran", tanggal: "2024-06-10", nominal: 120000 },
  {
    deskripsi: "Belanja di Supermarket",
    tanggal: "2024-06-12",
    nominal: 300000,
  },
];

export default function DashboardPage() {
  return (
    <main className="p-8 bg-slate-950 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white"> Dashboard Keuangan</h1>
        <Text className="text-slate-400">
          {" "}
          Monitoring keuangan Anda secara real-time{" "}
        </Text>
      </div>

      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card className="bg-slate-900 border-slate-800 ring-0 decoration-emerald-500 decoration-t-4">
          <Text className="text-slate-400">Saldo saat ini</Text>
          <Metric className="text-white">{formatRupiah(12500000)}</Metric>
        </Card>

        <Card className="bg-slate-900 border-slate-800 ring-0 decoration-emerald-500 decoration-t-4">
          <Flex justifyContent="between" alignItems="center">
            <Text className="text-slate-400">Pendapatan Bulanan</Text>
            <BadgeDelta deltaType="moderateIncrease" className="text-green-500">
              +8.2%
            </BadgeDelta>
          </Flex>
          <Metric className="text-white">{formatRupiah(8000000)}</Metric>
        </Card>

        <Card className="bg-slate-900 border-slate-800 ring-0 decoration-emerald-500 decoration-t-4">
          <Flex justifyContent="between" alignItems="center">
            <Text className="text-slate-400">Pengeluaran Bulanan</Text>
            <BadgeDelta deltaType="moderateDecrease" className="text-red-500">
              -2.4%
            </BadgeDelta>
          </Flex>
          <Metric className="text-white">{formatRupiah(3200000)}</Metric>
        </Card>
      </Grid>
      <div className="my-8">
        {" "}
        <Card>
          <h3 className="text-lg font-medium text-white">Laporan Keuangan</h3>
          <AreaChart
            className="h-72 mt-4"
            data={data}
            index="Bulan"
            categories={["Nominal"]}
            colors={["blue"]}
            valueFormatter={(number) => formatRupiah(number)}
          />
        </Card>
        <Card className="bg-slate-900 border-slate-800 ring-0 mt-8">
          <h3 className="text-lg font-medium text-white mb-4">
            Transaksi Terbaru
          </h3>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((item) => (
                <TableRow
                  key={item.deskripsi}
                  className="border-b border-slate-800"
                >
                  <TableCell className="text-white">{item.deskripsi}</TableCell>
                  <TableCell className="text-slate-400">
                    {item.tanggal}
                  </TableCell>
                  <TableCell className="text-white font-mono">
                    {formatRupiah(item.nominal)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </main>
  );
}
