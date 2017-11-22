import { Format } from './../order-photo-upload/models/format.class';
import { UserService } from "./../../../shared/services/user.service";
import { FileService } from "./../services/file.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { User } from "../../../shared/models/user.interface";

@Component({
  selector: "app-order-detailed-data",
  templateUrl: "./order-detailed-data.component.html",
  styleUrls: ["./order-detailed-data.component.scss"]
})
export class OrderDetailedDataComponent implements OnInit, AfterViewInit {
  klik(){
    console.log(this.client);
  } 
  client : User;
  errorMessage: any;
  showOrder() {
    console.log(this.fileService.order);
    this.submitOrder();

  }
  constructor(
    public fileService: FileService,
    public userService: UserService
  ) {}
  ngOnInit() {
    if (!this.fileService.fileItemDetails) {
      this.fileService.fileItemDetails = JSON.parse(
        localStorage.getItem("fileItemDetails")
      );
    }
    if (!this.fileService.order) {
      this.fileService.order = JSON.parse(localStorage.getItem("order"));
    }
    this.getClient();
    this.getDeliveryTypes();
  }

  getDeliveryPrice(id: number) : number{
    return this.fileService.deliveryTypes.find(x => x.id == id).price;
  }
  ngAfterViewInit(){
    this.calculateTotalOrderPrice();    
  }
  calculateTotalOrderPrice(){    
    if(this.fileService.deliveryTypes)
    this.fileService.order.totalOrderPrice = this.fileService.order.totalPrintsPrice + this.getDeliveryPrice(this.fileService.order.deliveryTypeId);
  }
  getTotalPrintsPrice() {
    return this.fileService.order.totalPrintsPrice;
  }
  getTotalPrints() {
    return this.fileService.order.totalPrints;
  }
  getTotalOrderPrice(){
    if(!this.fileService.order.totalOrderPrice) this.calculateTotalOrderPrice();
      return this.fileService.order.totalOrderPrice;
  }
  getClient() {
    this.client = this.userService.getClient();
  }
  getDeliveryTypes(){
    this.fileService
    .getDeliveryTypes()
    .subscribe(
      data => (this.fileService.deliveryTypes = data),
      error => (this.errorMessage = error)
    );
  }
  setTransferType(value : boolean){
    this.fileService.order.isTraditionalTransfer = value;
  }



  submitOrder(){
    this.fileService
    .submitOrder()
    .subscribe(
      data => (data),
      error => (this.errorMessage = error)
    );
  }
}
