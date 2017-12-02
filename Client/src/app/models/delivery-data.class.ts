export class DeliveryData {
    constructor(
   public id : number = 0,
   public deliveryFirstName: string = "",
   public deliveryLastName: string = "",
   public deliveryAddress: string = "",
   public deliveryCity: string = "",
   public deliveryPostCode: string = ""
    ) { }
}