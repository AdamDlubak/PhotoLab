import { UserEditDelivery } from './../models/user.edit.delivery.interface';
import { Order } from "../models/order.class";
import { Format } from "../models/format.class";
import { Cart } from "../models/cart.class";
import { Paper } from "../models/paper.class";
import { DeliveryType } from "../models/deliveryType.class";
import { PaymentType } from "../models/paymentType.class";
import { DefaultParam } from "../models/default-param.class";
import { FileUploader, FileItem } from "ng2-file-upload";
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { FileItemDetails } from "../models/file-item-details.class";
import { Subject } from "rxjs/Subject";
import { BaseService } from "./base.service";
import { ConfigService } from "../utils/config.service";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";


@Injectable()
export class FileService extends BaseService {
  baseUrl: string = "";

  formats: Format[];
  papers: Paper[];
  deliveryTypes: DeliveryType[];
  paymentTypes: PaymentType[];
  uploader: FileUploader;
  fileItemDetails: Array<FileItemDetails>;
  order: Order;
  defaultParam: DefaultParam;

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }
  getNewOrdersAmount() : Observable <number> {
    return this.http
    .get(this.baseUrl + "/photo/getnewordersamount")
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  setDate(orderId: number, dateTime: Date, dateType: number) {
    let body = JSON.stringify({dateTime, dateType});
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    
    return this.http
      .post(this.baseUrl + "/photo/submitorderdate/" + orderId, body, options)
      .catch(this.handleError);  
  }
  public setOrderStatus(orderId: number, stateId: number) {
    let body = JSON.stringify(stateId);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/photo/setorderstatus/" + orderId, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  
  public setOrderNewStatus(orderId: number, newStatus: boolean) {
    let body = JSON.stringify(newStatus);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/photo/setordernewstatus/" + orderId, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  public submitOrder() {
    this.order.photos = this.fileItemDetails;
    let body = JSON.stringify(this.order);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/photo/submitorder", body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getFormats() {
    return this.http
      .get(this.baseUrl + "/photo/getformats")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getDeliveryData(id : number) : Observable<UserEditDelivery> {
    return this.http
    .get(this.baseUrl + "/photo/getdeliverydata/" + id)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getPapers(): Observable<Paper[]> {
    return this.http
      .get(this.baseUrl + "/photo/getpapers")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getDefaults(): Observable<DefaultParam> {
    return this.http
      .get(this.baseUrl + "/photo/getdefaults")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getDeliveryTypes(): Observable<DeliveryType[]> {
    return this.http
      .get(this.baseUrl + "/photo/getdeliverytypes")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http
      .get(this.baseUrl + "/photo/getpaymenttypes")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getOrders() : Observable<Order[]> {
    return this.http
    .get(this.baseUrl + "/photo/getorders")
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getOrder(id : number) : Observable<Order> {
    return this.http
    .get(this.baseUrl + "/photo/getorder/" + id)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getIndexInUploadQueue(item): number {
    return this.uploader.queue.indexOf(item);
  }
  getFormatPrice(formats: Format[], formatId: number) {
    for (let format of formats) {
      if (format.id == formatId) {
        return format.price;
      }
    }
  }
  calculate(
    itemDetails: Array<FileItemDetails>,
    data: any,
    carts: Cart[],
    formats: Format[]
  ) {
    for (let cart of carts) {
      if (cart.formatId == data.format) {
        cart.amount = 0;
        cart.price = 0;

        for (let item of itemDetails) {
          for (var i: number = 0; i < item.prints.length; i++) {
            if (item.prints[i].format == data.format) {
              cart.amount += item.prints[i].amount;
              cart.price +=
                item.prints[i].amount *
                this.getFormatPrice(formats, data.format);
              cart.price = Math.round(cart.price * 100) / 100;
            }
          }
        }
        return;
      }
    }
  }
  calculateAfterRemove(
    carts: Cart[],
    item: FileItemDetails,
    formats: Format[]
  ) {
    for (let cart of carts) {
      for (var i: number = 0; i < item.prints.length; i++) {
        if (cart.formatId == item.prints[i].format) {
          cart.amount -= item.prints[i].amount;
          cart.price -=
            item.prints[i].amount *
            this.getFormatPrice(formats, item.prints[i].format);
          cart.price = Math.round(cart.price * 100) / 100;
        }
      }
    }
  }
  calculateAfterAddingFile(
    itemDetails: Array<FileItemDetails>,
    carts: Cart[],
    defaults: DefaultParam,
    formats: Format[]
  ) {
    for (let cart of carts) {
      if (defaults.formatId == cart.formatId) {
        cart.amount = 0;
        cart.price = 0;

        for (let item of itemDetails) {
          for (var i: number = 0; i < item.prints.length; i++) {
            if (defaults.formatId == item.prints[i].format) {
              cart.amount += item.prints[i].amount;
              cart.price +=
                item.prints[i].amount *
                this.getFormatPrice(formats, item.prints[i].format);
              cart.price = Math.round(cart.price * 100) / 100;
            }
          }
        }
      }
    }
  }

  calculateTotalPrintsPrice(carts: Cart[]) {
    let result = 0;
    for (let cart of carts) {
      result += cart.price;
    }
    this.order.totalPrintsPrice = Math.round(result * 100) / 100;
  }
  calculateTotalPrints(carts: Cart[]) {
    let result = 0;
    for (let cart of carts) {
      result += cart.amount;
    }
    this.order.totalPrints = result;
  }
  invokeEvent: Subject<any> = new Subject();
  invokeEvent2: Subject<any> = new Subject();
  powiadom() {
    this.invokeEvent.next();
  }
  powiadom2(itemDetails) {
    this.invokeEvent2.next(itemDetails);
  }

  // Admin - Formats
  submitFormat(format: Format): Observable<Format[]> {
    let body = JSON.stringify(format);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/photo/saveformat", body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  deleteFormat(id: number): Observable<string> {
    return this.http
      .delete(this.baseUrl + "/photo/deleteformat/" + id)
      .map(response => response.json().message)
      .catch(this.handleError);
  }

  // Admin - Papers
  submitPaper(paper: Paper): Observable<Paper[]> {
    let body = JSON.stringify(paper);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/photo/savepaper", body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  deletePaper(id: number): Observable<string> {
    return this.http
      .delete(this.baseUrl + "/photo/deletepaper/" + id)
      .map(response => response.json().message)
      .catch(this.handleError);
  }

  // Admin - Default
  editDefault(defaultParam: DefaultParam): Observable<DefaultParam> {
    let body = JSON.stringify(defaultParam);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/photo/editdefault", body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
}
