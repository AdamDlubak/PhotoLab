import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FileService {
    _baseURL: string = 'http://localhost:57500/api/photo/'
    constructor(private http: Http) { }

    // upload2(files, parameters){
    //     let headers = new Headers();
    //     let options = new RequestOptions({ headers: headers });
    //     options.params = parameters;
    //     if (files.length > 0) {
    //     let input = new FormData();
    //         for (var j = 0; j < files.length; j++) {
    //             input.append("file[]", files[j], files[j].name);
    //         }
    //     return  this.http.post(this._baseURL + 'upload', input, options)
    //              .map(response => response.json())
    //              .catch(error => Observable.throw(error));
    //     }
    // }
 


    upload(fileToUpload: any) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let input = new FormData();
        
        if (fileToUpload.length > 0) {
                for (var j = 0; j < fileToUpload.length; j++) {
                    input.append("files[]", fileToUpload[j], fileToUpload[j].name);
                }

    
        return this.http.post("http://localhost:57500/api/photo/upload", input, options).map(r => console.log(r));
     }
}
}
