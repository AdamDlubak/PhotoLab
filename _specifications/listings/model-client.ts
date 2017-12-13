export class Order {
    constructor(
        public userId : string,   

        public totalPrints : number = 0,        
        public totalPrintsPrice : number = 0,
        public totalOrderPrice : number = 0,
        
        public orderDate : Date = new Date(),
        public endDate : Date = null,
        public paymentDate : Date = null,
        public shippingDate : Date = null,
        
        public deliveryTypeId: number = 0,
        public deliveryDataId : number = null,
        public deliveryData : DeliveryData = null,
        
        public paymentTypeId : number = 0,
        public paymentType: PaymentType = null,
        public paymentStatusId : number = 0,
        public PaymentStatus : PaymentStatus = null,
        
        public isInvoice : boolean = false,        
        public invoiceDataId : number = null,
        public invoiceData : InvoiceData = null,
        
        public additionalInfo : string = "",
        public photos : Array<FileItemDetails> = null,
        public status : number = 1,
        public isNew : boolean = true
    ) { }