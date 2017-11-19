import { DeliveryType } from "./deliveryType.class";
import { del } from "selenium-webdriver/http";

export class Order {
    constructor(
        public totalPrintsPrice : number = 0,
        public totalPrints : number = 0,
        public totalOrderPrice : number = 0,
        public deliveryTypeId: number = 0,
        public isTraditionalTransfer : boolean = false,
        public orderDate : Date = new Date(),
        public endDate : Date = null,
        public paymentDate : Date = null,
        public shippingDate : Date = null,
        public payStatus : number = 0,
        public shipmentDataId : number = 0,
        public billDataId : number = 0
    ) { }




 
}
