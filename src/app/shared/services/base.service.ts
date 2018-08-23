import { throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { BadInput, AppError } from "../app-error";
import { LocalStorage } from '@ngx-pwa/local-storage';


export class BaseService {

    constructor(private url: string, private http: HttpClient, public localStorage: LocalStorage) {

    }

    get(uri: string) {
        return this.http.get(this.url + uri).pipe(
            catchError(this.handleError));
    }

    post(uri: string, resource: any) {
        return this.http.post(this.url + uri, resource).pipe(
            catchError(this.handleError)
        );
    }


    public toQueryString(obj) {
        var parts = [];
        for (var property in obj) {
            var value = obj[ property ];
            if (value != null && value != undefined)
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
        }
        return parts.join('&');
    }


    private handleError(error: Response) {
        if (error.status === 400) {
            return throwError(new BadInput(error));
        }
        return throwError(new AppError(error));
    }
} 