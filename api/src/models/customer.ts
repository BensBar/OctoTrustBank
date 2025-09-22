/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - customerId
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         customerId:
 *           type: integer
 *           description: The unique identifier for the customer
 *         firstName:
 *           type: string
 *           description: Customer's first name
 *         lastName:
 *           type: string
 *           description: Customer's last name
 *         email:
 *           type: string
 *           format: email
 *           description: Customer's email address
 *         phone:
 *           type: string
 *           description: Customer's phone number
 *         address:
 *           type: string
 *           description: Customer's mailing address
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Customer's date of birth
 *         socialSecurityLastFour:
 *           type: string
 *           description: Last four digits of customer's SSN
 *         customerSince:
 *           type: string
 *           format: date-time
 *           description: Date when customer joined the bank
 *         status:
 *           type: string
 *           enum: [active, inactive, suspended]
 *           description: Customer's account status
 */
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