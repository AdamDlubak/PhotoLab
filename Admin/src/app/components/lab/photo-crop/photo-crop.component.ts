import { Format } from './models/format.class';
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
import { DefaultParam } from './../photo-crop/models/default-param.class';
import { Paper } from "./models/paper.class";
@Component({
  selector: "app-file-upload",
  templateUrl: "./photo-crop.component.html",
  styleUrls: ["./photo-crop.component.scss"]
})



export class PhotoCropComponent implements OnInit {
  formats: Format[];
  papers: Paper[];
  @ViewChild('cart') child:CartComponent;
  dropBoxActivated: boolean = false;
  baseUrl: string;
  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  fileItemDetails: Array<FileItemDetails>;
  errorMessage: any;
  defaultParam : DefaultParam;
  defaults = {
    format: "Wybierz format",
    paper: "Wybierz papier",
    amount: 1
  }

  constructor(private fileService: FileService, private configService: ConfigService) {
    this.baseUrl = configService.getApiURI();
    this.uploader = new FileUploader({ url: this.baseUrl + "/photo/upload" });
    

    this.fileItemDetails = [];
    this.fileService.getDatas(this.uploader, this.fileItemDetails);
  }
  ngOnInit() {
    this.getFormats();
    this.getPapers();
    this.getDefaults();
  }
  private prepareUploader(formData) {
    this.uploader.onBuildItemForm = (item, form) => {
      for (let key in formData) {
        form.append(key, formData[key]);
      }
    }
  }

  getFileItemDetails(item : FileItem) : FileItemDetails{
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
        defaultParam => (
          this.defaultParam = defaultParam),
        error => (this.errorMessage = error)
      );
      
    
  }
  onProfitSelectionChange(item, entry): void {
    let id = this.uploader.getIndexOfItem(item);
    this.fileItemDetails[id].crop = entry;
    console.log(this.fileItemDetails[id].crop);

    console.log(entry);
    
}
  showqueue(item: any){ 
    console.log(this.fileItemDetails[this.uploader.getIndexOfItem(item)].crop);

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    
    this.uploader.onAfterAddingFile = fileItem => {
      this.fileItemDetails.push(
        new FileItemDetails(
          this.formats,
          fileItem._file.name,
          this.defaults
        )
      );
    };

    this.uploader.onAfterAddingAll = (fileItems: any[]) => {
      this.fileService.powiadom2(this.fileItemDetails);
      this.child.liczPoczatek(this.defaults);
      
    };
  }

  removeElement(itemDetails, item) {
    this.child.liczPoUsunieciu(itemDetails);    
    this.fileItemDetails.splice(this.uploader.queue.indexOf(item), 1);

  }
}
