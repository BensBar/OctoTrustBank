// Mock data for GitHub Pages deployment (when no API is available)

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgName: string;
  sku: string;
  unit: string;
  supplierId: number;
  discount?: number;
}

export interface Account {
  accountId: number;
  customerId: number;
  accountTypeId: number;
  accountNumber: string;
  accountName: string;
  balance: number;
  openedDate: string;
  status: 'active' | 'closed' | 'frozen';
}

export interface Transaction {
  transactionId: number;
  accountId: number;
  transactionTypeId: number;
  amount: number;
  description?: string;
  transactionDate: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  referenceNumber?: string;
}

export interface BankingStatsData {
  totalCustomers: number;
  totalAccounts: number;
  totalBalance: number;
  recentTransactions: number;
}

export const mockProducts: Product[] = [
  {
    productId: 1,
    supplierId: 1,
    name: 'Smart Savings Account',
    description: 'AI-powered savings account that learns your spending patterns and automatically saves based on your financial goals. Detects overspending, optimizes savings rates, and provides financial health insights.',
    price: 0.00,
    sku: 'BANK-SAVE-001',
    unit: 'account',
    imgName: 'savings-account.svg',
    discount: 0.25,
  },
  {
    productId: 2,
    supplierId: 3,
    name: 'Premium Checking Account',
    description: 'A full-featured checking account that detects patterns in your spending habits. Sends you financial reports and mobile alerts for unusual transactions.',
    price: 15.99,
    sku: 'BANK-CHECK-001',
    unit: 'monthly',
    imgName: 'checking-account.svg',
    discount: 0.25,
  },
  {
    productId: 3,
    supplierId: 2,
    name: 'Investment Portfolio Manager',
    description: 'AI-driven investment platform with personalized portfolio recommendations. Think robo-advisor, but smarter - customized investment strategies based on your risk tolerance and goals.',
    price: 89.99,
    sku: 'BANK-INVEST-001',
    unit: 'monthly',
    imgName: 'investment-portfolio.svg',
  },
  {
    productId: 4,
    supplierId: 2,
    name: 'Credit Monitoring Service',
    description: 'Real-time credit score tracking with AI-powered financial health detection. Monitors credit patterns, spending behavior, and provides personalized improvement recommendations.',
    price: 29.99,
    sku: 'BANK-CREDIT-001',
    unit: 'monthly',
    imgName: 'credit-monitoring.svg',
  },
  {
    productId: 5,
    supplierId: 1,
    name: 'Business Banking Suite',
    description: 'Comprehensive business banking solution that adapts to your company\'s financial cycles. Auto-generates financial reports, manages cash flow, and provides business insights.',
    price: 149.99,
    sku: 'BANK-BIZ-001',
    unit: 'monthly',
    imgName: 'business-banking.svg',
  },
  {
    productId: 6,
    supplierId: 1,
    name: 'Personal Finance Assistant',
    description: 'AI-powered financial advisor that analyzes your spending, detects opportunities for savings, and provides personalized budgeting recommendations with goal tracking.',
    price: 19.99,
    sku: 'BANK-ADVISOR-001',
    unit: 'monthly',
    imgName: 'personal-finance.svg',
  },
  {
    productId: 7,
    supplierId: 3,
    name: 'Mobile Banking Plus',
    description: 'Advanced mobile banking app with biometric security, real-time transaction notifications, and AI-powered spending insights. Includes budgeting tools and financial goal tracking.',
    price: 9.99,
    sku: 'BANK-MOBILE-001',
    unit: 'monthly',
    imgName: 'mobile-banking.svg',
    discount: 0.25,
  },
  {
    productId: 8,
    supplierId: 2,
    name: 'Loan Optimization Service',
    description: 'More than just loans - this service detects the best lending options, gamifies debt reduction with progress tracking, and awards financial milestones.',
    price: 59.99,
    sku: 'BANK-LOAN-001',
    unit: 'application',
    imgName: 'loan-optimization.svg',
  },
  {
    productId: 9,
    supplierId: 2,
    name: 'Fraud Protection System',
    description: 'Advanced security monitoring that detects unusual transactions and sends real-time fraud alerts to your personal security dashboard.',
    price: 24.99,
    sku: 'BANK-SECURITY-001',
    unit: 'monthly',
    imgName: 'fraud-protection.svg',
  },
  {
    productId: 10,
    supplierId: 3,
    name: 'Retirement Planning Tool',
    description: 'Intelligent retirement calculator that evolves with your financial situation. AI engine auto-adjusts investment strategies and provides guidance for optimal retirement planning.',
    price: 49.99,
    sku: 'BANK-RETIRE-001',
    unit: 'monthly',
    imgName: 'retirement-planning.svg',
    discount: 0.25,
  },
  {
    productId: 11,
    supplierId: 1,
    name: 'Digital Wallet Pro',
    description: 'Smart digital payment solution with biometric security and transaction categorization. Tracks spending patterns and provides insights to your financial dashboard.',
    price: 12.99,
    sku: 'BANK-WALLET-001',
    unit: 'monthly',
    imgName: 'digital-wallet.svg',
  },
  {
    productId: 12,
    supplierId: 2,
    name: 'Financial Analytics Dashboard',
    description: 'Comprehensive financial tracking platform that monitors all your accounts, analyzes spending trends, and generates detailed financial health reports.',
    price: 39.99,
    sku: 'BANK-ANALYTICS-001',
    unit: 'monthly',
    imgName: 'financial-analytics.svg',
  },
];

export const mockAccounts: Account[] = [
  {
    accountId: 1,
    customerId: 1,
    accountTypeId: 1,
    accountNumber: '****1234',
    accountName: 'Primary Checking',
    balance: 15750.25,
    openedDate: '2023-01-15',
    status: 'active'
  },
  {
    accountId: 2,
    customerId: 1,
    accountTypeId: 2,
    accountNumber: '****5678',
    accountName: 'Smart Savings',
    balance: 3250.80,
    openedDate: '2023-01-15',
    status: 'active'
  },
  {
    accountId: 3,
    customerId: 1,
    accountTypeId: 3,
    accountNumber: '****9012',
    accountName: 'Investment Portfolio',
    balance: 45000.00,
    openedDate: '2023-06-01',
    status: 'active'
  }
];

export const mockTransactions: Transaction[] = [
  {
    transactionId: 1,
    accountId: 1,
    transactionTypeId: 1,
    amount: -25.50,
    description: 'Coffee Shop - Downtown',
    transactionDate: '2025-09-23T08:30:00Z',
    status: 'completed',
    referenceNumber: 'TXN-001'
  },
  {
    transactionId: 2,
    accountId: 1,
    transactionTypeId: 2,
    amount: 2500.00,
    description: 'Salary Deposit',
    transactionDate: '2025-09-22T09:00:00Z',
    status: 'completed',
    referenceNumber: 'TXN-002'
  },
  {
    transactionId: 3,
    accountId: 2,
    transactionTypeId: 1,
    amount: -75.00,
    description: 'Grocery Store',
    transactionDate: '2025-09-22T14:20:00Z',
    status: 'completed',
    referenceNumber: 'TXN-003'
  },
  {
    transactionId: 4,
    accountId: 3,
    transactionTypeId: 3,
    amount: 500.00,
    description: 'Investment Dividend',
    transactionDate: '2025-09-21T10:15:00Z',
    status: 'completed',
    referenceNumber: 'TXN-004'
  },
  {
    transactionId: 5,
    accountId: 1,
    transactionTypeId: 1,
    amount: -120.00,
    description: 'Electric Bill',
    transactionDate: '2025-09-20T16:45:00Z',
    status: 'completed',
    referenceNumber: 'TXN-005'
  }
];

export const mockBankingStats: BankingStatsData = {
  totalCustomers: 12847,
  totalAccounts: 25694,
  totalBalance: 186750380.45,
  recentTransactions: 1534
};

// Mock fetch functions that simulate API calls
export const fetchMockProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500); // Simulate network delay
  });
};

export const fetchMockAccounts = (): Promise<Account[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAccounts);
    }, 300);
  });
};

export const fetchMockTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransactions);
    }, 400);
  });
};

export const fetchMockBankingStats = (): Promise<BankingStatsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBankingStats);
    }, 200);
  });
};