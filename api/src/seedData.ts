import { Supplier } from './models/supplier';
import { Product } from './models/product';
import { Headquarters } from './models/headquarters';
import { Branch } from './models/branch';
import { Order } from './models/order';
import { OrderDetail } from './models/orderDetail';
import { Delivery } from './models/delivery';
import { OrderDetailDelivery } from './models/orderDetailDelivery';

// Suppliers
export const suppliers: Supplier[] = [
  {
    supplierId: 1,
    name: 'FinTech Solutions Inc',
    description: 'Leading supplier of premium banking technology solutions',
    contactPerson: 'Alexander Sterling',
    email: 'alex@fintech-solutions.com',
    phone: '555-0101',
  },
  {
    supplierId: 2,
    name: 'BankWare Systems',
    description: 'Advanced banking-focused software and hardware supplier',
    contactPerson: 'Sarah Goldstein',
    email: 'sarah@bankware.com',
    phone: '555-0102',
  },
  {
    supplierId: 3,
    name: 'Digital Banking Innovations',
    description: 'Supplier of cutting-edge digital banking services and solutions',
    contactPerson: 'Michael Trustworth',
    email: 'michael@digital-banking.com',
    phone: '555-0103',
  },
];

// Products
export const products: Product[] = [
  {
    productId: 1,
    supplierId: 1,
    name: 'Smart Savings Account',
    description:
      'AI-powered savings account that automatically analyzes your spending patterns and optimizes your savings strategy. Includes intelligent budgeting recommendations and goal tracking.',
    price: 5.99,
    sku: 'BANK-SAVINGS-001',
    unit: 'monthly',
    imgName: 'savings-account.svg',
    discount: 0.25,
  },
  {
    productId: 2,
    supplierId: 3,
    name: 'Premium Checking Account',
    description:
      'A full-featured checking account that detects patterns in your spending habits. Sends you financial reports and mobile alerts for unusual transactions.',
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
    description:
      'AI-driven investment platform with personalized portfolio recommendations. Think robo-advisor, but smarter - customized investment strategies based on your risk tolerance and goals.',
    price: 89.99,
    sku: 'BANK-INVEST-001',
    unit: 'monthly',
    imgName: 'investment-portfolio.svg',
  },
  {
    productId: 4,
    supplierId: 2,
    name: 'Credit Monitoring Service',
    description:
      'Real-time credit score tracking with AI-powered financial health detection. Monitors credit patterns, spending behavior, and provides personalized improvement recommendations.',
    price: 29.99,
    sku: 'BANK-CREDIT-001',
    unit: 'monthly',
    imgName: 'credit-monitoring.svg',
  },
  {
    productId: 5,
    supplierId: 1,
    name: 'Business Banking Suite',
    description:
      'Comprehensive business banking solution that adapts to your company\'s financial cycles. Auto-generates financial reports, manages cash flow, and provides business insights.',
    price: 149.99,
    sku: 'BANK-BIZ-001',
    unit: 'monthly',
    imgName: 'business-banking.svg',
  },
  {
    productId: 6,
    supplierId: 1,
    name: 'Personal Finance Assistant',
    description:
      'AI-powered financial advisor that analyzes your spending, detects opportunities for savings, and provides personalized budgeting recommendations with goal tracking.',
    price: 19.99,
    sku: 'BANK-ADVISOR-001',
    unit: 'monthly',
    imgName: 'personal-finance.svg',
  },
  {
    productId: 7,
    supplierId: 3,
    name: 'Mobile Banking Plus',
    description:
      'Advanced mobile banking app with biometric security, real-time transaction notifications, and AI-powered spending insights. Includes budgeting tools and financial goal tracking.',
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
    description:
      'More than just loans - this service detects the best lending options, gamifies debt reduction with progress tracking, and awards financial milestones.',
    price: 59.99,
    sku: 'BANK-LOAN-001',
    unit: 'application',
    imgName: 'loan-optimization.svg',
  },
  {
    productId: 9,
    supplierId: 2,
    name: 'Fraud Protection System',
    description:
      'Advanced security monitoring that detects unusual transactions and sends real-time fraud alerts to your personal security dashboard.',
    price: 24.99,
    sku: 'BANK-SECURITY-001',
    unit: 'monthly',
    imgName: 'fraud-protection.svg',
  },
  {
    productId: 10,
    supplierId: 3,
    name: 'Retirement Planning Tool',
    description:
      'Intelligent retirement calculator that evolves with your financial situation. AI engine auto-adjusts investment strategies and provides guidance for optimal retirement planning.',
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
    description:
      'Smart digital payment solution with biometric security and transaction categorization. Tracks spending patterns and provides insights to your financial dashboard.',
    price: 12.99,
    sku: 'BANK-WALLET-001',
    unit: 'monthly',
    imgName: 'digital-wallet.svg',
  },
  {
    productId: 12,
    supplierId: 2,
    name: 'Financial Analytics Dashboard',
    description:
      'Comprehensive financial tracking platform that monitors all your accounts, analyzes spending trends, and generates detailed financial health reports.',
    price: 39.99,
    sku: 'BANK-ANALYTICS-001',
    unit: 'monthly',
    imgName: 'financial-analytics.svg',
  },
];

// Headquarters
export const headquarters: Headquarters[] = [
  {
    headquartersId: 1,
    name: 'OctoTrust Bank HQ',
    description: 'Financial services headquarters',
    address: '123 Banking Plaza, Financial District',
    contactPerson: 'Catherine Trustworth',
    email: 'catherine@octotrustbank.com',
    phone: '555-0001',
  },
];

// Branches
export const branches: Branch[] = [
  {
    branchId: 1,
    headquartersId: 1,
    name: 'Downtown Branch',
    description: 'Main downtown banking center',
    address: '456 Financial Plaza',
    contactPerson: 'Chloe Sterling',
    email: 'csterling@octotrustbank.com',
    phone: '555-0201',
  },
  {
    branchId: 2,
    headquartersId: 1,
    name: 'Westside Branch',
    description: 'Western district banking hub',
    address: '789 Commerce Avenue',
    contactPerson: 'Tom Banksworth',
    email: 'tbanksworth@octotrustbank.com',
    phone: '555-0202',
  },
];

// Orders
export const orders: Order[] = [
  {
    orderId: 1,
    branchId: 1,
    orderDate: new Date().toISOString(),
    name: 'Q2 Feline Tech Refresh',
    description: 'Quarterly smart cat tech product refresh',
    status: 'pending',
  },
  {
    orderId: 2,
    branchId: 2,
    orderDate: new Date().toISOString(),
    name: 'Cat Enrichment Bundle',
    description: 'Monthly cat entertainment systems restock',
    status: 'processing',
  },
];

// Order Details
export const orderDetails: OrderDetail[] = [
  {
    orderDetailId: 1,
    orderId: 1,
    productId: 2,
    quantity: 5,
    unitPrice: 199.99,
    notes: 'AutoClean Litter Domes for new cat café locations',
  },
  {
    orderDetailId: 2,
    orderId: 1,
    productId: 3,
    quantity: 5,
    unitPrice: 89.99,
    notes: 'CatFlix Entertainment Portals for waiting areas',
  },
  {
    orderDetailId: 3,
    orderId: 2,
    productId: 4,
    quantity: 20,
    unitPrice: 79.99,
    notes: 'PawTrack Smart Collars for adoption events',
  },
];

// Deliveries
export const deliveries: Delivery[] = [
  {
    deliveryId: 1,
    supplierId: 1,
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    name: 'PurrTech Smart Home Bundle',
    description: 'Premium cat tech products delivery for smart cat homes',
    status: 'pending',
  },
  {
    deliveryId: 2,
    supplierId: 2,
    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    name: 'WhiskerWare Entertainment Package',
    description: 'Entertainment and tracking systems for feline companions',
    status: 'in-transit',
  },
];

// Order Detail Deliveries
export const orderDetailDeliveries: OrderDetailDelivery[] = [
  {
    orderDetailDeliveryId: 1,
    orderDetailId: 1,
    deliveryId: 1,
    quantity: 5,
    notes: 'Delivery batch',
  },
  {
    orderDetailDeliveryId: 2,
    orderDetailId: 2,
    deliveryId: 1,
    quantity: 5,
    notes: 'Delivery batch',
  },
  {
    orderDetailDeliveryId: 3,
    orderDetailId: 3,
    deliveryId: 2,
    quantity: 20,
    notes: 'Delivery',
  },
];
