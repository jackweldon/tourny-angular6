import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AppStorageKeys } from './app-local-storage';
import { mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorage) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headerSettings: { [ name: string ]: string | string[]; } = {};

    return this.localStorage.getItem(AppStorageKeys.JWT).pipe(

      switchMap((token) => {

        if (token)
          headerSettings[ 'Authorization' ] = 'Bearer ' + token;

        headerSettings[ 'Content-Type' ] = 'application/json';
        
        const newHeader = new HttpHeaders(headerSettings);
        request = request.clone({ url: `${environment.apiBase}/${request.url}`, headers: newHeader });

        return next.handle(request);

      }));
  }
}
