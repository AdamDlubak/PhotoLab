import { Order } from './../../../models/order.class';
import { FileService } from './../../../services/file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(public fileService : FileService) { }
  errorMessage: any;

  orders : Array<Order>;
  klik(){
    console.log(this.orders);
  }


  
  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    this.fileService
    .getOrders()
    .subscribe(
      data => { this.orders = data; },
      error => (this.errorMessage = error)
    );
  }
}
