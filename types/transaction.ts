export type Category =
  | "Food"
  | "Transport"
  | "Hobby"
  | "Bills"
  | "Entertainment"
  | "Health"
  | "Education"
  | "Other";

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  date: string; //ISO string format
  note: string;
  type: "Income" | "Expense";
}

export interface AnalyticsSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  expenseChangePercentage: number; //indikator perubahan persentase pengeluaran dibandingkan periode sebelumnya
}
