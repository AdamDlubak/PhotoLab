import { FileService } from '../../../services/file.service';
import { Order } from '../../../models/order.class';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paper } from '../../../models/paper.class';
import { Format } from '../../../models/format.class';
import { UserEditDelivery } from '../../../models/user.edit.delivery.interface';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { OrderState } from '../../../models/order-state.class';
const now = new Date();

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy  {

  id: number;
  private sub: any;
  
  errorMessage: any;
  formats: Format[];
  papers: Paper[];
  order : Order;
  deliveryData: UserEditDelivery;
  date: NgbDateStruct;
  time: NgbTimeStruct;
  selectedDate: number;
  orderState : OrderState = new OrderState();
  
  selectToday() {
    this.date = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
    this.time = {hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds()};
  }
  setOrderStatus(stateId : number){
    this.order.status = stateId;
    this.fileService
    .setOrderStatus(this.id, stateId)
    .subscribe(
      data => { },
      error => (this.errorMessage = error)
    ); 
  }
  constructor(public route: ActivatedRoute, public fileService : FileService, private modalService: NgbModal) {
    this.getFormats();
    this.getPapers();
  }

  open(content, dateType: number) {
    this.selectToday();
    this.selectedDate = dateType;
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }
  openRemoveDate(content, dateType: number){
    this.selectedDate = dateType;
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }
  getStatusName(status: number){
    return this.orderState.states.find(x => x.id == status).name;
  }
  setDate(remove : boolean = false){
    let dateTime : Date;
    if(!remove) dateTime = new Date(this.date.year, this.date.month, this.date.day, this.time.hour, this.time.minute, this.time.second);
    else dateTime = null;
    switch(this.selectedDate){
      case 1:
      this.order.paymentDate = dateTime;
        break;
      case 2:
        this.order.shippingDate = dateTime;   
        break;
      case 3:
        this.order.endDate = dateTime;      
        break;
      default:
        break;
    }
    if(dateTime) dateTime.setHours(this.time.hour);
    this.fileService
    .setDate(this.id, dateTime, this.selectedDate)
    .subscribe(
      data => { },
      error => (this.errorMessage = error)
    ); 
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  getFormats() {
    this.fileService
      .getFormats()
      .subscribe(
        data => (this.fileService.formats = data),
        error => (this.errorMessage = error)
      );
  }
  getPapers() {
    this.fileService
      .getPapers()
      .subscribe(
        papers => (this.fileService.papers = papers),
        error => (this.errorMessage = error)
      );
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

      this.getOrder(this.id)
    
      });
  }
changeNewStatus(status : boolean){
  if(status) this.order.isNew = !this.order.isNew;
  else this.order.isNew = status;
  this.fileService
  .setOrderNewStatus(this.id, status)
  .subscribe(
    data => { },
    error => (this.errorMessage = error)
  ); 
}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getOrder(id : number) {
      this.fileService
      .getOrder(id)
      .subscribe(
        data => { this.order = data;
      this.changeNewStatus(false)},
        error => (this.errorMessage = error)
      );
    }
    getFormatNameById(id: number){
      console.log(id);
      return this.fileService.formats.find(x => x.id == id).name;
    }
    getPaperNameById(id: number){
      return this.fileService.papers.find(x => x.id == id).name;
    }
  }
