export class DeliveryType {
    id : number;
    name : string;
    icon : string;
    iconActive : string;
    description : string;
    price: number;

    constructor (id : number = 0,
        name : string = "",
        icon : string = "",
        iconActive : string = "",
        description : string = "",
        price: number = 0
    ){
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.iconActive = iconActive;
        this.description = description;
        this.price = price;
    }
}
