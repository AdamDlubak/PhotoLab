import { UserRegister } from './../models/user.register.interface';
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { User } from "../models/user.interface";
import { ConfigService } from "../utils/config.service";

import { BaseService } from "./base.service";

import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/Rx";
import "../rxjs-operators";

@Injectable()
export class UserService extends BaseService {
  baseUrl: string = "";

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem("auth_token");
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

  register(registerModel : UserRegister): Observable<UserRegister> {
    let body = JSON.stringify(registerModel);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/auth/register", body, options)
      .map(res => true)
      .catch(this.handleError);
  }

  login(email, password) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
      .post(this.baseUrl + "/auth/login", JSON.stringify({ email, password }), {
        headers
      })
      .map(res => res.json())
      .map(res => {
        localStorage.setItem("auth_token", res.auth_token);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }
  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUsers(): Observable<User[]> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.baseUrl + "/auth/users", options)
      .map((response: Response) => <User[]>response.json());
  }
    getClient(): User {
      return <User>JSON.parse(localStorage.getItem("user"));
    // let headers = new Headers();
    // let token = localStorage.getItem("auth_token");
    // headers.append("Content-Type", "application/json");
    // headers.append("Authorization", "Bearer " + token);
    // let options = new RequestOptions({ headers: headers });

    // return this.http
    //   .get(
    //     this.baseUrl + "/accounts/client/" + localStorage.getItem("user_id"),
    //     options
    //   )
    //   .map((response: Response) => <User>response.json())
    //   .catch(this.handleError);
      
  }
}
