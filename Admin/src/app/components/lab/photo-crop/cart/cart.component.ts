import { Cart } from "./../models/cart.class";
import { Format } from "./../models/format.class";
import { FileService } from "./../../services/file.service";
import { FileItemDetails } from "./../models/file-item-details.class";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  @Input() uploader: FileUploader;
  @Input() itemDetails: Array<FileItemDetails>;
  @Input() formats: Format[];
  constructor(private fileService: FileService) {
    this.fileService.invokeEvent2.subscribe(format => this.licz(format));
  }

  prices: number[];
  amounts: number[];
  suma: number;
  carts: Cart[];
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
  liczPoczatek(defaults: any) {
    this.fileService.liczPoczatek(
      this.itemDetails,
      this.carts,
      defaults,
      this.formats
    );
    this.suma = this.fileService.suma(this.carts);
  }
  liczPoUsunieciu(item) {
    this.fileService.liczPoUsunieciu(this.carts, item, this.formats);
    this.suma = this.fileService.suma(this.carts);
  }
  licz(data: any) {
    this.fileService.licz(this.itemDetails, data, this.carts, this.formats);
    this.suma = this.fileService.suma(this.carts);
  }

  addDatas() {
    // let iteratorek = 0;
    // this.uploader.onBuildItemForm = function(fileItem, form) {
    //   form.append(fileItem.file.name, iteratorek++);
    //   return { fileItem, form };
    // };
  }
}
