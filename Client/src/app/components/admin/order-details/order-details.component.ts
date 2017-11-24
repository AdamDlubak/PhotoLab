import { FileService } from '../../../services/file.service';
import { Order } from '../../../models/order.class';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy  {

  id: number;
  private sub: any;

  errorMessage: any;
  
    order : Order;

  constructor(public route: ActivatedRoute, public fileService : FileService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

      this.getOrder(this.id);
      });
  }
daj(){
  this.getOrder(this.id);
  
  console.log(this.order);
}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getOrder(id : number) {
      this.fileService
      .getOrder(id)
      .subscribe(
        data => { this.order = data; },
        error => (this.errorMessage = error)
      );
    }
  }
