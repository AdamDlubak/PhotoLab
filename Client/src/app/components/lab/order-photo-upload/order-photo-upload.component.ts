import { Format } from "./models/format.class";
import { PrintTypeComponent } from "./print-type/print-type.component";
import { CartComponent } from "./cart/cart.component";
import { FileItemDetails } from "./models/file-item-details.class";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from "@angular/core";
import { FileService } from "../services/file.service";
import { Http, Headers, RequestOptions } from "@angular/http";
import { AngularCropperjsComponent } from "angular-cropperjs";
import { FileUploader, FileItem } from "ng2-file-upload";
import { ConfigService } from "../../../shared/utils/config.service";
import { ViewChild } from "@angular/core";
import { DefaultParam } from "./models/default-param.class";
import { Paper } from "./models/paper.class";
import { Router } from "@angular/router";

@Component({
  selector: "app-order-photo-upload",
  templateUrl: "./order-photo-upload.component.html",
  styleUrls: ["./order-photo-upload.component.scss"]
})
export class OrderPhotoUploadComponent implements OnInit {
  formats: Format[];
  papers: Paper[];
  @ViewChild("cart") child: CartComponent;
  dragAreaClass: string = "is-empty";
  baseUrl: string;
  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  fileItemDetails: Array<FileItemDetails>;
  errorMessage: any;
  defaultParam: DefaultParam;
  rotate(item, value){
    console.log(this.getFileItemDetails(item).isHorizontal);
    
    this.getFileItemDetails(item).isHorizontal = value;
    console.log(this.getFileItemDetails(item).isHorizontal);
    
    
  }
  constructor(
    private fileService: FileService,
    private configService: ConfigService,
    private router: Router
  )  {
    this.baseUrl = configService.getApiURI();
    this.uploader = new FileUploader({ url: this.baseUrl + "/photo/upload" });
    this.fileItemDetails = [];
    this.fileService.getDatas(this.uploader, this.fileItemDetails);

    this.uploader.onCompleteAll = () => {
      this.router.navigate(["order-deitaled-data"]);
    };
  }
  ngOnInit() {
    this.getDefaults();    
    this.getFormats();
    this.getPapers();
    console.log(this.defaultParam);
    
  }

  private prepareUploader(formData) {
    this.uploader.onBuildItemForm = (item, form) => {
      for (let key in formData) {
        form.append(key, formData[key]);
      }
    };
  }

  getFileItemDetails(item: FileItem): FileItemDetails {
    return this.fileItemDetails[this.uploader.getIndexOfItem(item)];
  }

  getFormats() {
    this.fileService
      .getFormats()
      .subscribe(
        data => (this.formats = data),
        error => (this.errorMessage = error)
      );
  }
  getPapers() {
    this.fileService
      .getPapers()
      .subscribe(
        papers => (this.papers = papers),
        error => (this.errorMessage = error)
      );
  }
  getDefaults() {
    this.fileService
      .getDefaults()
      .subscribe(
        defaultParam => (this.defaultParam = defaultParam),
        error => (this.errorMessage = error)
      );
  }
  onProfitSelectionChange(item, entry): void {
    let id = this.uploader.getIndexOfItem(item);
    this.fileItemDetails[id].isContain = entry;
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;

    this.uploader.onAfterAddingFile = fileItem => {
      this.fileItemDetails.push(
        new FileItemDetails(this.formats, fileItem._file.name, this.defaultParam)
      );
    };

    this.uploader.onAfterAddingAll = (fileItems: any[]) => {
      this.fileService.powiadom2(this.fileItemDetails);
      this.child.liczPoczatek(this.defaultParam);
    };
  }

  removeElement(itemDetails, item) {
    this.child.liczPoUsunieciu(itemDetails);
    this.fileItemDetails.splice(this.uploader.queue.indexOf(item), 1);
  }
  clickInputFile(){
    var file = document.getElementById("uploader-input");
    file.click();
  }
  
}