import { Order } from './../../../models/order.class';
import { FileService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { OrderState } from '../../../models/order-state.class';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./../control-panel/control-panel.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(public orderService : orderService) { }
  errorMessage: any;
  orderState : OrderState = new OrderState();
  orders : Array<Order>;

  getStatusName(status: number){
    return this.orderState.states.find(x => x.id == status).name;
  }
  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    this.orderService
    .getOrders()
    .subscribe(
      data => { this.orders = data; },
      error => (this.errorMessage = error)
    );
  }
}