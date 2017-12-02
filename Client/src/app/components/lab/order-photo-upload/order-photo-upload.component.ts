import { User } from './../../../models/user.interface';
import { UserService } from './../../../services/user.service';
import { Order } from '../../../models/order.class';
import { Format } from "../../../models/format.class";
import { PrintTypeComponent } from "./print-type/print-type.component";
import { CartComponent } from "./cart/cart.component";
import { FileItemDetails } from "../../../models/file-item-details.class";
import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from "@angular/core";
import { FileService } from "../../../services/file.service";
import { Http, Headers, RequestOptions } from "@angular/http";
import { AngularCropperjsComponent } from "angular-cropperjs";
import { FileUploader, FileItem } from "ng2-file-upload";
import { ConfigService } from "../../../utils/config.service";
import { ViewChild } from "@angular/core";
import { DefaultParam } from "../../../models/default-param.class";
import { Paper } from "../../../models/paper.class";
import { Router } from "@angular/router";

@Component({
  selector: "app-order-photo-upload",
  templateUrl: "./order-photo-upload.component.html",
  styleUrls: ["./order-photo-upload.component.scss"]
})
export class OrderPhotoUploadComponent implements OnInit {

  @ViewChild("cart") child: CartComponent;
  baseUrl: string;
  dragAreaClass: string = "is-empty";
  hasBaseDropZoneOver: boolean = false;
  errorMessage: any;
  client : User;

  constructor(
    public fileService: FileService,
    public configService: ConfigService,
    public router: Router,
    public userService : UserService
  ) {
    this.baseUrl = configService.getApiURI();
    this.fileService.uploader = new FileUploader({ url: this.baseUrl + "/photo/upload" });
    this.fileService.fileItemDetails = [];
    this.fileService.uploader.onCompleteAll = () => {
      this.fileService.order.deliveryTypeId = this.fileService.defaultParam.deliveryTypeId;
      localStorage.setItem('fileItemDetails', JSON.stringify(this.fileService.fileItemDetails));
      localStorage.setItem('order', JSON.stringify(this.fileService.order));
      this.router.navigate(["order-detailed-data"]);

    };
  }
  ngOnInit() {
    this.getFormats();
    this.getPapers();
    this.getDeliveryTypes();
    this.getDefaults();
    this.getClient();
    this.fileService.order = new Order(this.client.id);
    
  }
  getClient() {
    this.client = this.userService.getClient();
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
  getDefaults() {
    this.fileService
      .getDefaults()
      .subscribe(
        defaultParam => (this.fileService.defaultParam = defaultParam),
        error => (this.errorMessage = error)
      );
  }
  getDeliveryTypes(){
    this.fileService
    .getDeliveryTypes()
    .subscribe(
      data => (this.fileService.deliveryTypes = data),
      error => (this.errorMessage = error)
    );
  }
  getFileItemDetails(item: FileItem): FileItemDetails {
    return this.fileService.fileItemDetails[this.fileService.uploader.getIndexOfItem(item)];
  }
  onProfitSelectionChange(item, entry): void {
    let id = this.fileService.uploader.getIndexOfItem(item);
    this.fileService.fileItemDetails[id].isContain = entry;
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;

    this.fileService.uploader.onAfterAddingFile = fileItem => {
      this.fileService.fileItemDetails.push(
        new FileItemDetails(
          this.fileService.formats,
          fileItem._file.name,
          this.fileService.defaultParam
        )
      );
    };

    this.fileService.uploader.onAfterAddingAll = (fileItems: any[]) => {
      this.fileService.powiadom2(this.fileService.fileItemDetails);
      this.child.calculateAfterAddingFile(this.fileService.defaultParam);
    };
  }
  removeElement(itemDetails, item) {
    this.child.calculateAfterRemove(itemDetails);
    this.fileService.fileItemDetails.splice(this.fileService.uploader.queue.indexOf(item), 1);
  }
  clickInputFile() {
    var file = document.getElementById("uploader-input");
    file.click();
  }
  rotate(item, value) {
    this.getFileItemDetails(item).isHorizontal = value;
  }
}
