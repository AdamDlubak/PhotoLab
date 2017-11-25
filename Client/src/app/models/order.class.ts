import { DeliveryType } from "./deliveryType.class";
import { del } from "selenium-webdriver/http";
import { FileItemDetails } from "./file-item-details.class";
import { User } from "./user.interface";

export class Order {
    constructor(
        public userId : string,   
        public user : User = null,     
        public totalPrintsPrice : number = 0,
        public totalPrints : number = 0,
        public totalOrderPrice : number = 0,
        public deliveryTypeId: number = 0,
        public isTraditionalTransfer : boolean = false,
        public orderDate : Date = new Date(),
        public endDate : Date = null,
        public paymentDate : Date = null,
        public shippingDate : Date = null,
        public paymentStatus : number = 0,
        public deliveryDataId : number = null,
        public invoiceDataId : number = null,
        public isInvoice : boolean = false,
        public additionalInfo : string = "",
        public photos : Array<FileItemDetails> = null,
    ) { }




 
}
