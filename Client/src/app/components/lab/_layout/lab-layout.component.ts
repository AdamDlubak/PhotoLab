import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
@Component({
  selector: 'app-lab-layout',
  templateUrl: './lab-layout.component.html',
  styleUrls: ['./lab-layout.component.scss']
})
export class LabLayoutComponent implements OnInit {

  title = 'Image Gallery';
  errorMessage: string;
  images: Array<any>= [];

  constructor(private fileService: FileService) { }

  ngOnInit() { }

}