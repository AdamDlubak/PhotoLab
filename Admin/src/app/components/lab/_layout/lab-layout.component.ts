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

  ngOnInit(){
    this.getImageData();
  }
  getImageData(){
    this.fileService.getImages().subscribe(
      
      data =>{ this.images = data.result},
      error => this.errorMessage = error
    )
  }

  refreshImages(status){
        if (status == true){
          console.log( "Uploaded successfully!");
          this.getImageData();
        }
}
}