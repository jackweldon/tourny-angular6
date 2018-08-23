import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../shared/services/base.service';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AppStorageKeys } from '../../shared/services/app-local-storage';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {


  constructor(http: HttpClient, public localStorage: LocalStorage) {
    super('', http, localStorage);
  }

  register(registerModel: RegisterModel) {
    return this.post('account/register/', registerModel);
  }

  login(loginModel: LoginModel) {
    return this.post('auth/login/', loginModel).pipe(
      tap((response: LoginResult) => {
        if (response) {
          this.localStorage.setItemSubscribe(AppStorageKeys.JWT, response.jwt);
        }
      }));
  }

  logout() {
    this.localStorage.removeItemSubscribe(AppStorageKeys.JWT);
  }
}
export class LoginResult {
  jwt: string;
}

export class RegisterModel {
  userName: string;
  email: string;
  password: string;
}
export class LoginModel {
  email: string;
  password: string;
}