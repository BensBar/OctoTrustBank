-- Seed data for account types
INSERT INTO account_types (account_type_id, type_name, description, interest_rate, minimum_balance, monthly_fee, transaction_limit, overdraft_allowed) VALUES
(1, 'checking', 'Standard checking account for daily transactions', 0.001, 0.0, 0.0, -1, TRUE),
(2, 'savings', 'High-yield savings account', 0.0425, 100.0, 0.0, 6, FALSE),
(3, 'investment', 'Investment account for stocks and bonds', 0.0, 1000.0, 9.99, -1, FALSE),
(4, 'retirement', '401(k) retirement savings account', 0.0, 0.0, 0.0, -1, FALSE);