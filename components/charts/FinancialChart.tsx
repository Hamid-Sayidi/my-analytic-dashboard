import { Card, AreaChart } from "@tremor/react";
import { formatRupiah } from "@/utils/formatters";

const data = [
  { bulan: "Jan", Nominal: 2890 },
  { bulan: "Feb", Nominal: 2756 },
  { bulan: "Mar", Nominal: 3322 },
  { bulan: "Apr", Nominal: 3470 },
  { bulan: "Mei", Nominal: 3475 },
  { bulan: "Jun", Nominal: 3129 },
];

export default function FinancialChart() {
  return (
    <Card>
      <h3 className="text-lg font-medium text-white">Laporan Keuangan</h3>
      <div className="mt-4 notranslate [&_text]:fill-slate-400!">
        <AreaChart
          className="h-72"
          data={data}
          index="bulan"
          categories={["Nominal"]}
          colors={["blue"]}
          valueFormatter={(number) => formatRupiah(number)}
          yAxisWidth={100}
          showAnimation={true}
          showLegend={true}
          noDataText="Memuat Data..."
        />
      </div>
    </Card>
  );
}
