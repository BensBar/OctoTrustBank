-- Seed data for transactions
INSERT INTO transactions (transaction_id, account_id, transaction_type_id, amount, description, transaction_date, status, reference_number, related_transaction_id) VALUES
(1, 1, 1, 1500.00, 'Payroll direct deposit', '2024-01-15 08:30:00', 'completed', 'REF-20240115-001', NULL),
(2, 1, 2, -45.67, 'Grocery Store Purchase', '2024-01-16 14:22:00', 'completed', 'REF-20240116-001', NULL),
(3, 1, 3, -200.00, 'Transfer to Savings', '2024-01-17 09:15:00', 'completed', 'REF-20240117-001', 4),
(4, 2, 4, 200.00, 'Transfer from Checking', '2024-01-17 09:15:00', 'completed', 'REF-20240117-002', 3),
(5, 3, 1, 2800.00, 'Salary deposit', '2024-01-15 08:30:00', 'completed', 'REF-20240115-002', NULL),
(6, 3, 2, -125.50, 'Restaurant bill', '2024-01-16 19:45:00', 'completed', 'REF-20240116-002', NULL),
(7, 5, 1, 3200.00, 'Freelance payment', '2024-01-14 16:20:00', 'completed', 'REF-20240114-001', NULL),
(8, 5, 2, -87.99, 'Online purchase', '2024-01-15 11:30:00', 'completed', 'REF-20240115-003', NULL),
(9, 7, 1, 4500.00, 'Monthly salary', '2024-01-15 08:30:00', 'completed', 'REF-20240115-004', NULL),
(10, 7, 2, -230.45, 'Utility payment', '2024-01-16 10:15:00', 'completed', 'REF-20240116-003', NULL),
(11, 9, 1, 2100.00, 'Part-time job deposit', '2024-01-15 08:30:00', 'completed', 'REF-20240115-005', NULL),
(12, 9, 3, -500.00, 'Transfer to Savings', '2024-01-16 12:00:00', 'completed', 'REF-20240116-004', 13),
(13, 10, 4, 500.00, 'Transfer from Checking', '2024-01-16 12:00:00', 'completed', 'REF-20240116-005', 12);