import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { UserEdit } from "../../../shared/models/user.edit.interface";
import { UserService } from "../../../shared/services/user.service";

@Component({
  selector: "app-edit-form",
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.scss"]
})
export class EditFormComponent implements OnInit {
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
