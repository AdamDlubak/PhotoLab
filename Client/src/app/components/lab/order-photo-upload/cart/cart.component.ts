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
  @Input() uploader: FileUploader;
  @Input() itemDetails: Array<FileItemDetails>;
  @Input() formats: Format[];
  carts: Cart[];
  
  constructor(private fileService: FileService) {
    this.fileService.invokeEvent2.subscribe(format => this.calculate(format));
  }

  ngOnInit() {
    this.carts = [];
    for (var i = 0; i < this.formats.length; i++) {
      this.carts.push({
        formatId: this.formats[i].id,
        amount: 0,
        price: 0
      });
    }
  }
  getFormatName(formatId: number) {
    for (let format of this.formats) {
      if (formatId == format.id) return format.name;
    }
  }
  getTotalPrice(){
    return this.fileService.totalPrice;
  }
  calculateAfterAddingFile(defaults: any) {
    this.fileService.calculateAfterAddingFile(this.itemDetails, this.carts, defaults, this.formats);
    this.fileService.calculateTotalPrice(this.carts);
  }
  calculateAfterRemove(item : FileItemDetails) {
    this.fileService.calculateAfterRemove(this.carts, item, this.formats);
    this.fileService.calculateTotalPrice(this.carts);
  }
  calculate(data: any) {
    this.fileService.calculate(this.itemDetails, data, this.carts, this.formats);
    this.fileService.calculateTotalPrice(this.carts);
  }

  addDatas() {

    
    // let iteratorek = 0;
    // this.uploader.onBuildItemForm = function(fileItem, form) {
    //   form.append(fileItem.file.name, iteratorek++);
    //   return { fileItem, form };
    // };
  }
}
