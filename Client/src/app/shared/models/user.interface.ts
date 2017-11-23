export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  deliveryFirstName: string;
  deliveryLastName: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryPostCode: string;

  invoiceFirstName: string;
  invoiceLastName: string;
  invoiceCompany: string;
  invoiceNip: string;
  invoiceAddress: string;
  invoicePostCode: string;
  invoiceType: boolean;

}
