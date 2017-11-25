import { FileService } from '../../../services/file.service';
import { Order } from '../../../models/order.class';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paper } from '../../../models/paper.class';
import { Format } from '../../../models/format.class';

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

  constructor(public route: ActivatedRoute, public fileService : FileService) {
    this.getFormats();
    this.getPapers();
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

      this.getOrder(this.id);
      });
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
    getFormatNameById(id: number){
      return this.fileService.formats.find(x => x.id == id).name;
    }
    getPaperNameById(id: number){
      return this.fileService.papers.find(x => x.id == id).name;
    }
  }
