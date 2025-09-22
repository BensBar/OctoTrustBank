/**
 * @swagger
 * components:
 *   schemas:
 *     FinancialService:
 *       type: object
 *       required:
 *         - serviceId
 *         - serviceName
 *         - category
 *       properties:
 *         serviceId:
 *           type: integer
 *           description: The unique identifier for the financial service
 *         serviceName:
 *           type: string
 *           description: Name of the financial service
 *         description:
 *           type: string
 *           description: Description of the financial service
 *         fee:
 *           type: number
 *           format: float
 *           description: Monthly fee for the service
 *         category:
 *           type: string
 *           enum: [loan, investment, insurance, card]
 *           description: Category of the financial service
 *         isActive:
 *           type: boolean
 *           description: Whether the service is currently offered
 */
export interface FinancialService {
  serviceId: number;
  serviceName: string;
  description?: string;
  fee: number;
  category: 'loan' | 'investment' | 'insurance' | 'card';
  isActive: boolean;
}