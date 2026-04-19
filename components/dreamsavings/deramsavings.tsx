import { formatCurrency } from "@/utils/formatters";
import { Card, Flex, Text, Badge, Metric, ProgressBar } from "@tremor/react";
import { DreamCardProps } from "@/types/transaction";

export default function DreamCard({
  title,
  targetAmount,
  currentAmount,
  category,
  isCompelete,
}: DreamCardProps) {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <Card className="bg-slate-900 border-slate-800 ring-0 decoration-emerald-500 decoration-t-4">
      <Flex justifyContent="between" alignItems="center">
        <Text className="text-slate-400 font-medium">{title}</Text>
        {category && <Badge>{category}</Badge>}
      </Flex>

      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-2 mt-4"
      >
        <Metric className="text-white text-2xl font-bold">
          {formatCurrency(currentAmount)}
        </Metric>
        <Text className="text-slate-500 text-sm">
          {" "}
          dari {formatCurrency(targetAmount)}
        </Text>
      </Flex>

      <div>
        <Flex>
          <Text className="text-xs text-slate-400"> Progress</Text>
          <Text className="text-xs text-slate-400">
            {percentage.toFixed(1)}%
          </Text>
        </Flex>
        <ProgressBar
          value={percentage}
          color={percentage >= 100 ? "emerald" : "blue"}
          className="mt-2"
        />
      </div>
      {percentage >= 100 && (
        <Text className="mt-3 text-xs text-emerald-400 font-medium animate-pulse">
          ✨ Impian Tercapai!
        </Text>
      )}
    </Card>
  );
}
