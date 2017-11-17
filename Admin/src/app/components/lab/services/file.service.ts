import { Format } from "./../photo-crop/models/format.class";
import { Cart } from "./../photo-crop/models/cart.class";
import { DefaultParam } from "./../photo-crop/models/default-param.class";
import { FileUploader, FileItem } from "ng2-file-upload";
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { FileItemDetails } from "../photo-crop/models/file-item-details.class";
import { Subject } from "rxjs/Subject";
import { BaseService } from "../../../shared/services/base.service";
import { ConfigService } from "../../../shared/utils/config.service";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Paper } from "../photo-crop/models/paper.class";

@Injectable()
export class FileService extends BaseService {
  baseUrl: string = "";
  uploader: FileUploader;
  fileItemDetails: FileItemDetails;
  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }
  public default: DefaultParam;
  getFormats() {
    return this.http
      .get(this.baseUrl + "/photo/getformats")
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
  getDatas(uploader, fileItemDetails) {
    this.fileItemDetails = fileItemDetails;
    this.uploader = uploader;
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
  licz(
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
  liczPoUsunieciu(carts: Cart[], item: FileItemDetails, formats: Format[]) {
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
  liczPoczatek(
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

  suma(carts: Cart[]) {
    let result = 0;
    for (let cart of carts) {
      result += cart.price;
    }
    return Math.round(result * 100) / 100;
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
  editDefault(defaultParam: DefaultParam) : Observable<DefaultParam> {
    let body = JSON.stringify(defaultParam);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.baseUrl + "/photo/editdefault", body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
}
