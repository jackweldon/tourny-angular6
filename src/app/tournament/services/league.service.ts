import { BaseService } from './../../shared/services/base.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ISearch } from '../../models/interfaces/ISearch';
import { Player } from '../components/player-components/player';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends BaseService {


  constructor(http: HttpClient, public localStorage: LocalStorage) {
    super('', http, localStorage);
  }

  addPlayerToLeague(playerId: number, leagueId: number) {
    return this.post('playerleagues', { playerId, leagueId });
  }

  removePlayerFromLeague(playerId: number, leagueId: number) {
    return this.post('playerleagues/delete', { playerId, leagueId });
  }
}


