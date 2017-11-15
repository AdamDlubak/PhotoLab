import { Paper } from './../../lab/photo-crop/models/paper.class';
import { Format } from './../../lab/photo-crop/models/format.class';
import { Component, OnInit } from '@angular/core';
import { FileService } from "../../lab/services/file.service";
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  errorMessage: any;
  formats: Format[];
  papers: Paper[];
  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.getFormats();
    this.getPapers();
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
}
