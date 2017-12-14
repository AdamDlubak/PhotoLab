import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "./services/user.service";
import decode from "jwt-decode";

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(private user: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem("auth_token");
    if(token == null) {
      this.router.navigate(["home"]);
      return false;
    }
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (!this.user.isLoggedIn() || !tokenPayload.roladmin) {
      this.router.navigate(["home"]);
      return false;
    }
    return true;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private user: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.user.isLoggedIn()) {
      this.router.navigate(["login/admin"]);
      return false;
    }
    return true;
  }
}
