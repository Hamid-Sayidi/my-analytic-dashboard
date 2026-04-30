export interface Transaction {
  id: number;
  nominal: number;
  tanggal: string;
  deskripsi: string;
  tipe: "Income" | "Expense";
}

export interface ApiResponse {
  transactions: Transaction[];
  stats: {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    totalLocked: number;
  };
  // expenseChangePercentage: number; //indikator perubahan persentase pengeluaran dibandingkan periode sebelumnya
}

export interface StatsProps {
  balance: number;
  income: number;
  expense: number;
}

export interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (item: Transaction) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterType: string;
  setFilterType: (val: string) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  currentMonthLabel: string;
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
}

export interface DreamCardProps {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category?: string;
  isComplete: boolean;
  refreshData?: () => void;
}
