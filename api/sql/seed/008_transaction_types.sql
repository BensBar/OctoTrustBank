-- Seed data for transaction types
INSERT INTO transaction_types (transaction_type_id, type_name, description, requires_approval) VALUES
(1, 'deposit', 'Cash or check deposit', FALSE),
(2, 'withdrawal', 'Cash withdrawal or debit purchase', FALSE),
(3, 'transfer_out', 'Transfer money to another account', FALSE),
(4, 'transfer_in', 'Receive money from another account', FALSE),
(5, 'fee', 'Bank fee or charge', FALSE),
(6, 'interest', 'Interest payment', FALSE),
(7, 'loan_payment', 'Loan payment', FALSE),
(8, 'wire_transfer', 'Wire transfer (domestic or international)', TRUE);