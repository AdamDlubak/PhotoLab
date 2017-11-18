import { FileService } from './../services/file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detailed-data',
  templateUrl: './order-detailed-data.component.html',
  styleUrls: ['./order-detailed-data.component.scss']
})
export class OrderDetailedDataComponent implements OnInit {

  constructor(private fileService: FileService) { }

  ngOnInit() {

  }
  getTotalPrice(){
    // console.log('retrievedObject: ', this.fileService.fileItemDetails);
    
    // // Retrieve the object from storage
    // var retrievedObject = localStorage.getItem('testObject');
    
    // console.log('retrievedObject: ', JSON.parse(retrievedObject));

    return this.fileService.totalPrice;
    
  }

}
