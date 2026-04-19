"use client";
import { Card, AreaChart } from "@tremor/react";
import { useMemo } from "react";

interface Props {
  allTransactions: any[];
}

export default function FinancialChart({ allTransactions }: Props) {
  const chartData = useMemo(() => {
    const initialData = [
      { bulan: "Jan", Nominal: 0 },
      { bulan: "Feb", Nominal: 0 },
      { bulan: "Mar", Nominal: 0 },
      { bulan: "Apr", Nominal: 0 },
      { bulan: "Mei", Nominal: 0 },
      { bulan: "Jun", Nominal: 0 },
    ];

    allTransactions.forEach((item: any) => {
      const tanggal = new Date(item.tanggal);
      const bulan = tanggal.toLocaleDateString("id-ID", {
        month: "short",
      });
      const dataPoint = initialData.find((d) => d.bulan === bulan);

      if (dataPoint) {
        if (item.tipe === "Income") {
          dataPoint.Nominal += item.nominal;
        } else {
          dataPoint.Nominal -= item.nominal;
        }
      }
    });
    return initialData;
  }, [allTransactions]);

  return (
    <Card>
      <h3 className="text-lg font-medium text-white">Laporan Keuangan</h3>
      <div className="mt-4 notranslate [&_text]:fill-slate-400!">
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="bulan"
          categories={["Nominal"]}
          colors={["blue"]}
          valueFormatter={(number) =>
            `Rp ${Intl.NumberFormat("id-ID").format(number)}`
          }
          yAxisWidth={100}
          showAnimation={true}
          showLegend={true}
          noDataText="Memuat Data..."
        />
      </div>
    </Card>
  );
}
