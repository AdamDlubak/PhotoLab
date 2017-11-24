import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { UserLogin } from "../../../models/user.login.interface";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  userLogin: UserLogin = { email: "", password: "" };

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param["brandNew"];
        this.userLogin.email = param["email"];
      }
    );
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
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
            this.router.navigate(["/admin"]);
          }
        }, error => (this.errors = error));
    }
  }
}
