import { Transaction, Category } from "@/types/transaction";

const categories: Category[] = [
  "Food",
  "Transport",
  "Hobby",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

export const generateMockData = (count: number): Transaction[] => {
  return Array.from({ length: count }).map((_, index) => {
    const isIncome = Math.random() > 0.8; // 20% kemungkinan income
    return {
      id: `txn_${index + 1}`,
      amount: Math.floor(Math.random() * 50000) + 10000,
      category: categories[Math.floor(Math.random() * categories.length)],
      date: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000),
      ).toISOString(),
      note: `Transaksi ke-${index + 1}`,
      type: isIncome ? "Income" : "Expense",
    };
  });
};
