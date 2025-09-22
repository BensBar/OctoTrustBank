-- Seed data for accounts
INSERT INTO accounts (account_id, customer_id, account_type_id, account_number, account_name, balance, opened_date, status) VALUES
(1, 1, 1, 'CHK-001-20200115', 'Alex Johnson Primary Checking', 2547.83, '2020-01-15 09:30:00', 'active'),
(2, 1, 2, 'SAV-001-20200115', 'Alex Johnson Savings', 15620.45, '2020-01-15 09:35:00', 'active'),
(3, 2, 1, 'CHK-002-20190310', 'Sarah Williams Checking', 1834.92, '2019-03-10 15:00:00', 'active'),
(4, 2, 3, 'INV-002-20200615', 'Sarah Williams Investment', 45230.78, '2020-06-15 10:15:00', 'active'),
(5, 3, 1, 'CHK-003-20210722', 'Michael Brown Checking', 987.33, '2021-07-22 11:45:00', 'active'),
(6, 3, 2, 'SAV-003-20210722', 'Michael Brown Emergency Fund', 8750.00, '2021-07-22 11:50:00', 'active'),
(7, 4, 1, 'CHK-004-20181205', 'Emily Davis Checking', 3421.67, '2018-12-05 17:15:00', 'active'),
(8, 4, 4, 'RET-004-20190101', 'Emily Davis 401k', 78945.12, '2019-01-01 08:00:00', 'active'),
(9, 5, 1, 'CHK-005-20220418', 'David Miller Checking', 1256.78, '2022-04-18 10:50:00', 'active'),
(10, 5, 2, 'SAV-005-20220418', 'David Miller Savings', 5432.10, '2022-04-18 10:55:00', 'active');