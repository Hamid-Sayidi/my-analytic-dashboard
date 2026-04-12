import { Card, Flex, Grid, Metric, Text, BadgeDelta } from "@tremor/react";
import { formatRupiah } from "@/utils/formatters";

export default function StatsGrid() {
  return (
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
  );
}
