import { Format } from './../models/format.class';
import { Paper } from './../models/paper.class';
import { FileItemDetails } from "./../models/file-item-details.class";
import { FileItem, FileUploader } from "ng2-file-upload";
import { Component, Input, OnInit, AfterContentInit, OnChanges, Output, EventEmitter } from "@angular/core";
import { FileService } from './../../services/file.service';
import { last } from "rxjs/operator/last";
@Component({
  selector: "app-print-type",
  templateUrl: "./print-type.component.html",
  styleUrls: ["./print-type.component.css"]
})
export class PrintTypeComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() item: FileItem;
  @Input() itemDetail: FileItemDetails;
  @Input() formats: Format[];
  @Input() papers: Paper[];
  @Input() defaultParams: any;
  @Output() myEvent = new EventEmitter();
  paper = {};
  amount = {};

  typesOfSize = 5;
  itemId: number;
  constructor(private fileService : FileService) {
    this.fileService.invokeEvent.subscribe(value => this.refreshDefaults());
  }
  ngOnInit() {
    this.itemId = this.fileService.getIndexInUploadQueue(this.item);

  }
  getcos(){
    console.log(this.itemDetail);
  }
 getFormatName(formatId : number){
   for(let format of this.formats){
      if(formatId == format.id) return format.name;
   }   
 }
 getPaperName(paperId : number){
  for(let paper of this.papers){
     if(paperId == paper.id) return paper.name;
  }   
}
  ngOnChanges() {
      for(var i: number = 0; i < this.formats.length; i++) {
      this.paper[i] = 0;
      this.amount[i] = 0;
    } 
  }

  ngAfterContentInit() {
    this.refreshDefaults();
  }
  refreshDefaults() {

    // for(var i: number = 0; i < this.formats.length; i++) {
    //   this.paper[i] = 0;
    //   this.amount[i] = 0;
    // } 

    // this.paper[this.defaultParams.format] =  this.itemDetails[this.itemId].paperSize[this.defaultParams.format][0];
    // this.amount[this.defaultParams.format] =  this.itemDetails[this.itemId].paperSize[this.defaultParams.format][1];
  }
  onChangePrints(format, value) {
    let data = {
      format,
      value
    }
    // if (event.target.value <= 0) {
    //   this.itemDetails[this.itemId].paperSize[format][0] = 0;
    // }
    // else {
    //   this.itemDetails[this.itemId].paperSize[format][1] = Number(event.target.value);
    // }
    this.myEvent.emit(data);


  }

  onChangePaper(event, format) {
    // this.itemDetails[this.itemId].paperSize[format][0] = Number(event);

  }
}
