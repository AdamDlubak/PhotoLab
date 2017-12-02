export class InvoiceData {
    constructor(
        public id: number = 0,
        public invoiceFirstName: string = "",
        public invoiceLastName: string = "",
        public invoiceCompany: string = "",
        public invoiceNip: string = "",
        public invoiceAddress: string = "",
        public invoicePostCode: string = "",
        public invoiceType: boolean = false
    ) { }
}