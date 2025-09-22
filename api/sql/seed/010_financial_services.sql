-- Seed data for financial services
INSERT INTO financial_services (service_id, service_name, description, fee, category, is_active) VALUES
(1, 'Personal Loan', 'Unsecured personal loan up to $50,000', 0.0, 'loan', TRUE),
(2, 'Auto Loan', 'Financing for new and used vehicles', 0.0, 'loan', TRUE),
(3, 'Mortgage', 'Home purchase and refinancing loans', 0.0, 'loan', TRUE),
(4, 'Credit Card', 'Visa/Mastercard with rewards program', 0.0, 'card', TRUE),
(5, 'Debit Card', 'Standard checking account debit card', 0.0, 'card', TRUE),
(6, 'Investment Portfolio', 'Managed investment portfolio service', 25.00, 'investment', TRUE),
(7, 'Financial Planning', 'Personal financial advisory services', 150.00, 'investment', TRUE),
(8, 'Life Insurance', 'Term and whole life insurance policies', 45.00, 'insurance', TRUE),
(9, 'Auto Insurance', 'Vehicle insurance coverage', 89.99, 'insurance', TRUE),
(10, 'Home Insurance', 'Property and casualty insurance', 125.50, 'insurance', TRUE);