import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ConfigService } from "../utils/config.service";
import { BaseService } from "./base.service";
import { StatData } from "../models/stat-data.class";
import { Observable } from "rxjs/Rx";
import { StatParameters } from "../models/stat-parameters.class";
import { StatEvidenceData } from "../models/stat-evidence-data.class";
import { StatEvidenceForm } from "../models/stat-evidence-form.class";
import { StatFrontierData } from "../models/stat-frontier-data.class";
@Injectable()
export class StatsService extends BaseService {
  baseUrl: string = "";

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }
  addEvidenceStat(formData : StatEvidenceForm){
    let body = JSON.stringify(formData);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
    .post(this.baseUrl + "/stats/postevidencestat", body, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);    
  }
  getSystemStats(statParameters : StatParameters) : Observable <StatData[]> {
    let body = JSON.stringify(statParameters);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
    .put(this.baseUrl + "/stats/putsystemstats", body, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getEvidenceStats(statParameters : StatParameters) : Observable <StatEvidenceData[]> {
    let body = JSON.stringify(statParameters);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
    .put(this.baseUrl + "/stats/putevidencestats", body, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getFrontierStats(statParameters : StatParameters) : Observable <StatFrontierData> {
    let body = JSON.stringify(statParameters);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this.http
    .put(this.baseUrl + "/stats/putfrontierstats", body, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

}