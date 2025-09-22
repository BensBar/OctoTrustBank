-- Seed data for customers (banking version of suppliers)
INSERT INTO customers (customer_id, first_name, last_name, email, phone, address, date_of_birth, social_security_last_four, customer_since, status) VALUES
(1, 'Alex', 'Johnson', 'alex.johnson@email.com', '555-0101', '123 Main St, Cityville, ST 12345', '1990-05-15', '1234', '2020-01-15 09:00:00', 'active'),
(2, 'Sarah', 'Williams', 'sarah.williams@email.com', '555-0102', '456 Oak Ave, Townsburg, ST 67890', '1985-11-22', '5678', '2019-03-10 14:30:00', 'active'),
(3, 'Michael', 'Brown', 'michael.brown@email.com', '555-0103', '789 Pine Rd, Villagetown, ST 11111', '1992-08-08', '9012', '2021-07-22 11:15:00', 'active'),
(4, 'Emily', 'Davis', 'emily.davis@email.com', '555-0104', '321 Elm St, Hamletville, ST 22222', '1988-02-14', '3456', '2018-12-05 16:45:00', 'active'),
(5, 'David', 'Miller', 'david.miller@email.com', '555-0105', '654 Maple Dr, Countryside, ST 33333', '1995-09-30', '7890', '2022-04-18 10:20:00', 'active');