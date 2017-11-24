import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { UserEdit } from "../../../models/user.edit.interface";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user.interface";

@Component({
  selector: "app-admin-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  private subscription: Subscription;
  usersA: User[];

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // subscribe to router event
    this.loadData();
  }
  loadData() {
    this.getUsers();
}
  getUsers() {
    this.userService.getUsers().subscribe(users => this.onDataLoadSuccessful(users), error => this.onDataLoadFailed(error));
  }

onDataLoadSuccessful(users: User[]) {
    // this.alertService.stopLoadingMessage();
    // this.loadingIndicator = false;
  this.usersA = users;

}
onDataLoadFailed(error: any) {

}
}
