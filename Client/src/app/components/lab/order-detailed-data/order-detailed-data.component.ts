import { DeliveryData } from './../../../models/delivery-data.class';
import { Format } from '../../../models/format.class';
import { UserService } from "./../../../services/user.service";
import { FileService } from "../../../services/file.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { User } from "../../../models/user.interface";
import { Router } from '@angular/router';
import { InvoiceData } from '../../../models/invoice-data.class';

@Component({
  selector: "app-order-detailed-data",
  templateUrl: "./order-detailed-data.component.html",
  styleUrls: ["./order-detailed-data.component.scss"]
})
export class OrderDetailedDataComponent implements OnInit, AfterViewInit {

  anotherDeliveryData: boolean = false;
  anotherDeliveryDataIcon: string = "../../../../assets/images/icons/blank-check-box.svg";
  anotherDeliveryDataIconActive: string = "../../../../assets/images/icons/check-box.svg";

  anotherInvoiceData: boolean = false;
  anotherInvoiceDataIcon: string = "../../../../assets/images/icons/invoice.svg";
  anotherInvoiceDataIconActive: string = "../../../../assets/images/icons/invoice-active.svg";

  client : User;
  errorMessage: any;

  checkDeliveryData() {
    if(!this.anotherDeliveryData) {
      if(this.fileService.order.deliveryTypeId != 1) {
        this.fileService.order.deliveryDataId = this.client.deliveryData.id;
      }
    } else {
      this.fileService.order.deliveryDataId = null;
    }
  }
  checkInvoiceData() {
    if(!this.anotherInvoiceData) {
      if(this.fileService.order.invoiceDataId != 1) {
        this.fileService.order.invoiceDataId = this.client.invoiceData.id;
      }
    } else {
      this.fileService.order.invoiceDataId = null;
    }
  }
  setAnotherDeliveryData(){
    this.anotherDeliveryData = !this.anotherDeliveryData;
    this.checkDeliveryData();
  }
  setAnotherInvoiceData(){
    this.anotherInvoiceData = !this.anotherInvoiceData;
    this.checkInvoiceData();
  }
  onCompanyChange(entry): void {
    this.fileService.order.invoiceData.invoiceType = entry;
  }
  showOrder() {
    console.log(this.fileService.order);
    this.submitOrder();

  }
  wantInvoice() {
    if(this.fileService.order.isInvoice){
      if(this.anotherInvoiceData){
        this.fileService.order.invoiceDataId = null;
      }
      else {
        this.fileService.order.invoiceDataId = this.client.invoiceData.id;
      }
    }
  }
  constructor(
    public fileService: FileService,
    public userService: UserService,
    public router: Router
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
    this.getPaymentTypes();
    if(!this.fileService.order.deliveryData) this.fileService.order.deliveryData = new DeliveryData();   
    if(!this.fileService.order.invoiceData) this.fileService.order.invoiceData = new InvoiceData();   
  }

  getDeliveryPrice(id: number) : number{
    return this.fileService.deliveryTypes.find(x => x.id == id).price;
  }
  getPaymentPrice(id: number) : number{
    return this.fileService.paymentTypes.find(x => x.id == id).price;
  }
  ngAfterViewInit(){
    this.setDefaultDeliveryAndPayment();
    this.calculateTotalOrderPrice();    
    this.calculateTotalOrderPrice();    
    
  }
  setDefaultDeliveryAndPayment(paymentId = 1, deliveryId = 1) {
    this.fileService.order.deliveryTypeId = deliveryId;
    this.fileService.order.paymentTypeId = paymentId;
  }
  calculateTotalOrderPrice(id = 1){    
    this.fileService.order.deliveryTypeId = id;
    if(this.fileService.paymentTypes && this.fileService.deliveryTypes && this.fileService.paymentTypes && this.fileService.deliveryTypes)
    this.fileService.order.totalOrderPrice = this.fileService.order.totalPrintsPrice + this.getPaymentPrice(this.fileService.order.paymentTypeId) + this.getDeliveryPrice(this.fileService.order.deliveryTypeId);
  }
  calculateTotalOrderPricebyPayment(id = 1){    
    this.fileService.order.paymentTypeId = id;
    if(this.fileService.paymentTypes && this.fileService.deliveryTypes && this.fileService.paymentTypes && this.fileService.deliveryTypes)
    this.fileService.order.totalOrderPrice = this.fileService.order.totalPrintsPrice + this.getPaymentPrice(this.fileService.order.paymentTypeId) + this.getDeliveryPrice(this.fileService.order.deliveryTypeId);
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
  getPaymentTypes(){
    this.fileService
    .getPaymentTypes()
    .subscribe(
      data => (this.fileService.paymentTypes = data),
      error => (this.errorMessage = error)
    );
  }
  setTransferType(value : number){
    this.fileService.order.paymentTypeId = value;
  }



  submitOrder(){  
    if(this.fileService.order.deliveryDataId != null || this.fileService.order.deliveryTypeId == 1){
      // remove data from form
      this.fileService.order.deliveryData = null;
    }
    if(this.fileService.order.isInvoice == false || this.fileService.order.invoiceDataId != null){
      this.fileService.order.invoiceData = null;
    }
    if(this.fileService.order.isInvoice == true && this.fileService.order.invoiceData.invoiceType){
      this.fileService.order.invoiceData.invoiceFirstName = "";
      this.fileService.order.invoiceData.invoiceLastName = "";
    }
    else if(this.fileService.order.isInvoice == true) {
      this.fileService.order.invoiceData.invoiceCompany = "";
      this.fileService.order.invoiceData.invoiceNip = "";  
    }
    this.fileService.order.isNew = true;
    this.fileService.order.status = 1;
    this.fileService
    .submitOrder()
    .subscribe(
      data => (data),
      error => (this.errorMessage = error)
    );
    this.router.navigate(["order-summary"]);
    
  }
}
