import { InvoiceData } from './invoice-data.class';
import { DeliveryData } from './delivery-data.class';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  ordersAmount: number;
  deliveryData: DeliveryData;
  invoiceData: InvoiceData;
}
