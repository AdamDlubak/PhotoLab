export class PaymentType {
    id : number;
    name : string;
    icon : string;
    iconActive : string;
    description : string;
    price: number;
    operative: boolean;

    constructor (id : number = 0,
        name : string = "",
        icon : string = "",
        iconActive : string = "",
        description : string = "",
        price: number = 0,
        operative: boolean = true
    ){
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.iconActive = iconActive;
        this.description = description;
        this.price = price;
        this.operative = operative;
    }
}
