import { formatRupiah } from "@/utils/formatters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Card,
} from "@tremor/react";

export default function TransactionTable({
  transactions,
}: {
  transactions: any[];
}) {
  return (
    <Card className="bg-slate-900 border-slate-800 ring-0 mt-8">
      <h3 className="text-lg font-medium text-white mb-4">Transaksi Terbaru</h3>
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
          {transactions.map((item: any) => (
            <TableRow key={item.id} className="border-b border-slate-800">
              <TableCell className="text-white">
                {item.deskripsi || item.description}
              </TableCell>
              <TableCell className="text-slate-400">
                {new Date(item.tanggal).toLocaleDateString("id-ID")}
              </TableCell>
              <TableCell className="text-white font-mono">
                {formatRupiah(item.nominal || item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
