import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { UserService } from "./../../../shared/services/user.service";
import { DialogService } from "ng2-bootstrap-modal";
import { OnDestroy } from "@angular/core";
import { ConfirmModel } from "./../login-modal/login-modal.component";
import { Subscription } from "rxjs";
import { DialogComponent } from "ng2-bootstrap-modal";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register-modal",
  templateUrl: "./register-modal.component.html",
  styleUrls: ["../login-modal/login-modal.component.scss"]
})
export class RegisterModalComponent extends DialogComponent<
  ConfirmModel,
  boolean
> implements ConfirmModel, OnInit, OnDestroy {
  title: string;
  message: string;

  private subscription: Subscription;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

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
}
