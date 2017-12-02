import { UserRegister } from "./../../../models/user.register.interface";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { UserService } from "./../../../services/user.service";
import { OnDestroy } from "@angular/core";
import { ConfirmModel } from "./../login-modal/login-modal.component";
import { Subscription } from "rxjs";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register-modal",
  templateUrl: "./register-modal.component.html",
  styleUrls: ["./register-modal.component.scss"]
})
export class RegisterModalComponent implements OnInit, OnDestroy {
  title: string;
  message: string;

  private subscription: Subscription;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  registerModel: UserRegister = {
    email: "",
    password: "",
    repeatedPassword: "",
    firstName: "",
    lastName: ""
  };

  ngOnInit() {
    // subscribe to router event
  }

  ngOnDestroy() {
  }


  closeResult: string;
  
    constructor(
      private modalService: NgbModal,
      private userService: UserService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {}
  
    open(content) {
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

  register() {
    this.isRequesting = true;
    this.userService
      .register(this.registerModel)
      .finally(() => (this.isRequesting = false))
      .subscribe(result => {
        if (result) {
          this.router.navigate(["/home"]);
        }
      }, error => (this.errors = error));
  }
}
