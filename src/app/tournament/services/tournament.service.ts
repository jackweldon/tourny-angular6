import { BaseService } from './../../shared/services/base.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class TournamentService extends BaseService {

  constructor(http: HttpClient, public localStorage: LocalStorage) {
    super('tournament', http, localStorage);
  }

  getById(id: number) {
    return this.get('/' + id);
  }
  
  search(model: TournamentSearchModel) {
    const queryString = this.toQueryString(model);
    return this.get('/' + queryString).subscribe(m => console.log(m));
  }

  create(model: TournamentCreateModel) {
    return this.post('', model);
  }

}

export class TournamentSearchModel {
  orgainserId?: string;
}

export class TournamentCreateModel {
  endDate: Date;
  startDate: Date;
  leagues: any[];
  name: string;
  streamUrl?: string;

}