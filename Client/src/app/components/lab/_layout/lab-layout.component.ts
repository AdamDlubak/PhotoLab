import { RegisterModalComponent } from './../register-modal/register-modal.component';
import { UserService } from './../../../shared/services/user.service';
import { LoginModalComponent } from './../login-modal/login-modal.component';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal";
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

  @ViewChild('loginModal') myModal:ElementRef;

  constructor(private fileService: FileService, private dialogService:DialogService, private userService: UserService) { }

  showConfirm() {
    let disposable = this.dialogService.addDialog(LoginModalComponent, {
        title:'Confirm title', 
        message:'Confirm message'})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
                // alert('accepted');
            }
            else {
                // alert('declined');
            }
        });

}

showRegisterModal() {
  let disposable = this.dialogService.addDialog(RegisterModalComponent , {
      title:'Confirm title', 
      message:'Confirm message'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
              // alert('accepted');
          }
          else {
              // alert('declined');
          }
      });

}
isLoggedIn() {
  return this.userService.isLoggedIn();
}
logout() {
  this.userService.logout();
}
  ngOnInit() { }

}