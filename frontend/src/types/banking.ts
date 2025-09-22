// Banking interface types for frontend

export interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  socialSecurityLastFour?: string;
  customerSince: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface AccountType {
  accountTypeId: number;
  typeName: string;
  description?: string;
  interestRate: number;
  minimumBalance: number;
  monthlyFee: number;
  transactionLimit: number;
  overdraftAllowed: boolean;
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

export interface TransactionType {
  transactionTypeId: number;
  typeName: string;
  description?: string;
  requiresApproval: boolean;
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
  relatedTransactionId?: number;
}

export interface FinancialService {
  serviceId: number;
  serviceName: string;
  description?: string;
  fee: number;
  category: 'loan' | 'investment' | 'insurance' | 'card';
  isActive: boolean;
}