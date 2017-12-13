import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { UserEdit } from "../../../models/user.edit.interface";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user.interface";
import { ToastrService } from "ngx-toastr";
import { UserRegister } from "../../../models/user.register.interface";

declare var jQuery: any;

@Component({
  selector: "app-admin-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./../control-panel/control-panel.component.scss"]
})
export class UsersComponent implements OnInit {
  private subscription: Subscription;
  usersA: User[];
  userId = "";
  errorMessage: any;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  userRegister: UserRegister = { firstName: "", lastName: "", email: "", password: "", repeatedPassword: "" };
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public toastrService: ToastrService
  ) {}
  setId(id: string) {
    this.userId = id;
  }
  ngOnInit() {
    // subscribe to router event
    this.loadData();
  }
  loadData() {
    this.getUsers();
  }
  getUsers() {
    this.userService
      .getUsers()
      .subscribe(
        users => this.onDataLoadSuccessful(users),
        error => this.onDataLoadFailed(error)
      );
  }
  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe(data => {
      this.toastrService.error("Usunięto użytkownika!");
      this.getUsers();
      jQuery("#deleteModal").modal("hide");
    }, error => (this.errorMessage = error));
  }
  onDataLoadSuccessful(users: User[]) {
    // this.alertService.stopLoadingMessage();
    // this.loadingIndicator = false;
    this.usersA = users;
  }
  onDataLoadFailed(error: any) {}

  register({ value, valid }: { value: UserRegister; valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = "";
    console.log(value);
    if (valid) {
      this.userService
        .register(value)
        .finally(() => (this.isRequesting = false))
        .subscribe(result => {
          if (result) {
            this.toastrService.success("Dodano użytkownika!");
            this.getUsers();
            jQuery("#registerModal").modal("hide");
          }
        }, error => (this.errors = error));
    }
  }
}
