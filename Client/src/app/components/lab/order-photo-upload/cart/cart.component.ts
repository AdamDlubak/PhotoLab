import { Cart } from "./../models/cart.class";
import { Format } from "./../models/format.class";
import { FileService } from "./../../services/file.service";
import { FileItemDetails } from "./../models/file-item-details.class";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  carts: Cart[];
  
  constructor(public fileService: FileService) {
    this.fileService.invokeEvent2.subscribe(format => this.calculate(format));
  }

  ngOnInit() {
    this.carts = [];
    for (var i = 0; i < this.fileService.formats.length; i++) {
      this.carts.push({
        formatId: this.fileService.formats[i].id,
        amount: 0,
        price: 0
      });
    }
  }
  getFormatName(formatId: number) {
    for (let format of this.fileService.formats) {
      if (formatId == format.id) return format.name;
    }
  }
  getTotalPrintsPrice(){
    return this.fileService.order.totalPrintsPrice;
  }
  calculateAfterAddingFile(defaults: any) {
    this.fileService.calculateAfterAddingFile(this.fileService.fileItemDetails, this.carts, defaults, this.fileService.formats);
    this.fileService.calculateTotalPrintsPrice(this.carts);
    this.fileService.calculateTotalPrints(this.carts);
  }
  calculateAfterRemove(item : FileItemDetails) {
    this.fileService.calculateAfterRemove(this.carts, item, this.fileService.formats);
    this.fileService.calculateTotalPrintsPrice(this.carts);
    this.fileService.calculateTotalPrints(this.carts);
  }
  calculate(data: any) {
    this.fileService.calculate(this.fileService.fileItemDetails, data, this.carts, this.fileService.formats);
    this.fileService.calculateTotalPrintsPrice(this.carts);
    this.fileService.calculateTotalPrints(this.carts);
  }

  addDatas() {


    // let iteratorek = 0;
    // this.uploader.onBuildItemForm = function(fileItem, form) {
    //   form.append(fileItem.file.name, iteratorek++);
    //   return { fileItem, form };
    // };
  }
}
