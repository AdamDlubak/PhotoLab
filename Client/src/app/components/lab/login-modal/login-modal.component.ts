import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserLogin } from "../../../models/user.login.interface";
import { UserService } from "../../../services/user.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"]
})
export class LoginModalComponent implements OnInit, OnDestroy {
  title: string;
  message: string;

  private subscription: Subscription;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  userLogin: UserLogin = { email: "", password: "" };

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }
  ngOnInit() { }

  ngOnDestroy() {

  }
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
          }
        }, error => (this.errors = error));
    }
  }
}
