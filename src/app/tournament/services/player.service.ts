import { BaseService } from './../../shared/services/base.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ISearch } from '../../models/interfaces/ISearch';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseService {

  constructor(http: HttpClient, public localStorage: LocalStorage) {
    super('player', http, localStorage);
  }

  getById(id: number) {
    return this.get('/' + id);
  }

  search(model: PlayerSearchModel) {
    const queryString = this.toQueryString(model);
    return this.get('?' + queryString);
  }


}

export class PlayerSearchModel implements ISearch {

  pageSize: number;
  page: number;
  sortBy: string;
  isSortAscending: boolean;
  name: string;

}