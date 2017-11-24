import { UserEdit } from './../models/user.edit.interface';
import { UserRegister } from "./../models/user.register.interface";
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { User } from "../models/user.interface";
import { ConfigService } from "../utils/config.service";

import { BaseService } from "./base.service";

import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/Rx";
import "../rxjs-operators";
import { UserEditDelivery } from '../models/user.edit.delivery.interface';
import { UserEditInvoice } from '../models/user.edit.invoice.interface.ts';
import { UserChangePassword } from '../models/user.change.password.interface';

@Injectable()
export class UserService extends BaseService {

  client: User;

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

  register(registerModel: UserRegister): Observable<UserRegister> {
    let body = JSON.stringify(registerModel);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/auth/register", body, options)
      .map(res => true)
      .catch(this.handleError);
  }
  editUser(userModel : UserEdit) : Observable<UserEdit> { 
    let body = JSON.stringify(userModel);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/accounts/editprofile", body, options)
      
      .map(res => res.json())
      .map(res => {
        localStorage.setItem("user", JSON.stringify(res));
      })
      .catch(this.handleError);
  }
  getUserDelivery(id : string) : Observable<UserEditDelivery> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.baseUrl + "/accounts/getdeliveryprofile/" + id, options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  editUserDelivery  (userDeliveryModel : UserEditDelivery) : Observable<UserEditDelivery> { 
    let body = JSON.stringify(userDeliveryModel);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/accounts/editdeliveryprofile", body, options)
      .map(res => { })
      .catch(this.handleError);
  }

  getUserInvoice(id : string) : Observable<UserEditInvoice> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.baseUrl + "/accounts/getinvoiceprofile/" + id, options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  changePassword(userChangePassword : UserChangePassword) : Observable<string> {
    let body = JSON.stringify(userChangePassword);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/accounts/changepassword", body, options)
      .map(res => { })
      .catch(this.handleError);
  }
  editUserInvoice(userInvoiceModel : UserEditInvoice) : Observable<UserEditInvoice> { 
    let body = JSON.stringify(userInvoiceModel);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/accounts/editinvoiceprofile", body, options)
      .map(res => { })
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
        return res.user;
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
  }
}
