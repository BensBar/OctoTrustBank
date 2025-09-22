-- Migration 002: Transform to Banking Schema
-- Add banking tables for customers, accounts, transactions, and financial services

-- Create customers table (replaces suppliers)
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    date_of_birth TEXT,
    social_security_last_four TEXT,
    customer_since TEXT NOT NULL DEFAULT (datetime('now')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended'))
);

-- Create account_types table for account type definitions
CREATE TABLE account_types (
    account_type_id INTEGER PRIMARY KEY,
    type_name TEXT NOT NULL UNIQUE,
    description TEXT,
    interest_rate REAL DEFAULT 0.0,
    minimum_balance REAL DEFAULT 0.0,
    monthly_fee REAL DEFAULT 0.0,
    transaction_limit INTEGER DEFAULT -1, -- -1 means unlimited
    overdraft_allowed BOOLEAN DEFAULT FALSE
);

-- Create accounts table (replaces products)
CREATE TABLE accounts (
    account_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    account_type_id INTEGER NOT NULL,
    account_number TEXT UNIQUE NOT NULL,
    account_name TEXT NOT NULL,
    balance REAL NOT NULL DEFAULT 0.0,
    opened_date TEXT NOT NULL DEFAULT (datetime('now')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'frozen')),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (account_type_id) REFERENCES account_types(account_type_id) ON DELETE RESTRICT
);

-- Create transaction_types table
CREATE TABLE transaction_types (
    transaction_type_id INTEGER PRIMARY KEY,
    type_name TEXT NOT NULL UNIQUE,
    description TEXT,
    requires_approval BOOLEAN DEFAULT FALSE
);

-- Create transactions table (replaces orders)
CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY,
    account_id INTEGER NOT NULL,
    transaction_type_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    description TEXT,
    transaction_date TEXT NOT NULL DEFAULT (datetime('now')),
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    reference_number TEXT UNIQUE,
    -- For transfers, this points to the related transaction in the other account
    related_transaction_id INTEGER,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (transaction_type_id) REFERENCES transaction_types(transaction_type_id) ON DELETE RESTRICT,
    FOREIGN KEY (related_transaction_id) REFERENCES transactions(transaction_id)
);

-- Create financial_services table (replaces products concept for banking services)
CREATE TABLE financial_services (
    service_id INTEGER PRIMARY KEY,
    service_name TEXT NOT NULL,
    description TEXT,
    fee REAL DEFAULT 0.0,
    category TEXT NOT NULL, -- 'loan', 'investment', 'insurance', 'card'
    is_active BOOLEAN DEFAULT TRUE
);

-- Create customer_services table (many-to-many relationship)
CREATE TABLE customer_services (
    customer_service_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    subscription_date TEXT NOT NULL DEFAULT (datetime('now')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
    monthly_fee REAL DEFAULT 0.0,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES financial_services(service_id) ON DELETE CASCADE,
    UNIQUE(customer_id, service_id)
);

-- Create indexes for better performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_accounts_customer_id ON accounts(customer_id);
CREATE INDEX idx_accounts_account_number ON accounts(account_number);
CREATE INDEX idx_accounts_account_type_id ON accounts(account_type_id);
CREATE INDEX idx_accounts_status ON accounts(status);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_transaction_type_id ON transactions(transaction_type_id);
CREATE INDEX idx_transactions_transaction_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_reference_number ON transactions(reference_number);
CREATE INDEX idx_customer_services_customer_id ON customer_services(customer_id);
CREATE INDEX idx_customer_services_service_id ON customer_services(service_id);