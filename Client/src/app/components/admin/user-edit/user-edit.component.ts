import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { UserEdit } from "../../../models/user.edit.interface";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-admin-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  userEdit: UserEdit = { email: "", password: "", firstName: "", lastName: "", deliveryPostCode: "" };

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
        this.userEdit.email = param["email"];
      }
    );
  }



}
