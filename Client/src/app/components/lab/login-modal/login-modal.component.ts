import { Component, OnInit, OnDestroy } from "@angular/core";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Credentials } from "../../../shared/models/credentials.interface";
import { UserService } from "../../../shared/services/user.service";
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
export class LoginModalComponent extends DialogComponent<ConfirmModel, boolean>
  implements ConfirmModel, OnInit, OnDestroy {
  title: string;
  message: string;

  private subscription: Subscription;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { email: "", password: "" };

  constructor(
    dialogService: DialogService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(dialogService);
  }
  ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param["brandNew"];
        this.credentials.email = param["email"];
      }
    );
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }
  login({ value, valid }: { value: Credentials; valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = "";
    if (valid) {
      this.userService
        .login(value.email, value.password)
        .finally(() => (this.isRequesting = false))
        .subscribe(result => {
          if (result) {
            this.close();
            this.router.navigate(["/home"]);
          }
        }, error => (this.errors = error));
    }
  }
}
