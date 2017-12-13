import { User } from './../../../models/user.interface';
import { RegisterModalComponent } from './../register-modal/register-modal.component';
import { UserService } from './../../../services/user.service';
import { LoginModalComponent } from './../login-modal/login-modal.component';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FileService } from '../../../services/file.service';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { UserLogin } from '../../../models/user.login.interface';
import { Subscription } from 'rxjs';
import { UserRegister } from '../../../models/user.register.interface';

declare var jQuery:any;

@Component({
  selector: 'app-lab-layout',
  templateUrl: './lab-layout.component.html',
  styleUrls: ['./lab-layout.component.scss']
})
export class LabLayoutComponent implements OnInit {

  errorMessage: string;
  images: Array<any>= [];

  message: string;

  private subscription: Subscription;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  userLogin: UserLogin = { email: "", password: "" };
  userRegister: UserRegister = { firstName: "", lastName: "", email: "", password: "", repeatedPassword: "" };
  constructor(private fileService: FileService, private userService: UserService, private modalService: NgbModal) { }

  login({ value, valid }: { value: UserLogin; valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = "";
    if (valid) {
      this.userService
        .login(value.email, value.password)
        .finally(() => (this.isRequesting = false))
        .subscribe(result => {
          if (result) {
            this.userService.client = result;
            jQuery("#loginModal").modal("hide");
          }
        }, error => (this.errors = error));
    }
  }
  register({ value, valid }: { value: UserRegister; valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = "";
    console.log(value);
    if (valid) {
      this.userService
        .register( value)
        .finally(() => (this.isRequesting = false))
        .subscribe(result => {
          if (result) {
            this.userService
            .login(value.email, value.password)
            .finally(() => (this.isRequesting = false))
            .subscribe(result => {
              if (result) {
                this.userService.client = result;
              }
            }, error => (this.errors = error));
            jQuery("#registerModal").modal("hide");
          }
        }, error => (this.errors = error));
    }
  }
isAdmin() : boolean{
  return true;
}

  showConfirm() {
    // let disposable = this.dialogService.addDialog(LoginModalComponent, {
    //     title:'Confirm title', 
    //     message:'Confirm message'})
    //     .subscribe((isConfirmed)=>{
    //         //We get dialog result
    //         if(isConfirmed) {
    //             // alert('accepted');
    //         }
    //         else {
    //             // alert('declined');
    //         }
    //     });

}
openLoginModal() {
  const modalRef = this.modalService.open(LoginModalComponent);
  
}
showRegisterModal() {
//   let disposable = this.dialogService.addDialog(RegisterModalComponent , {
//       title:'Confirm title', 
//       message:'Confirm message'})
//       .subscribe((isConfirmed)=>{
//           //We get dialog result
//           if(isConfirmed) {
//               // alert('accepted');
//           }
//           else {
//               // alert('declined');
//           }
//       });

}
isLoggedIn() {
  return this.userService.isLoggedIn();
}
logout() {
  this.userService.logout();
}
  ngOnInit() { 
    if (!this.userService.client && localStorage.getItem("user") != null) {
        this.userService.client = JSON.parse(localStorage.getItem("user"));
    }
    

  }
}