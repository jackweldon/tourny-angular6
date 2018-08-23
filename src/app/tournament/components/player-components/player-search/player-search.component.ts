import { PlayerService, PlayerSearchModel } from './../../../services/player.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Player } from '../Player';
import { debounceTime, mergeMap, distinctUntilChanged } from 'rxjs/operators';
import { ISearchResult } from '../../../../models/interfaces/ISearch';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: [ './player-search.component.scss' ]
})
export class PlayerSearchComponent implements OnInit {

  @Output() selected = new EventEmitter();

  search: string;
  searchControl = new FormControl();

  searchModel: PlayerSearchModel;
  players: Player[];

  constructor(private playerService: PlayerService) {

    this.searchModel = new PlayerSearchModel();
    this.searchModel.pageSize = 15;
    this.searchModel.page = 0;
    this.searchModel.isSortAscending = true;
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap(() => {
        this.searchModel.name = this.searchControl.value;
        return this.playerService.search(this.searchModel);
      })
    ).subscribe(
      (m: ISearchResult) => {
        this.players = m.items;
      }
    );
  }

  public selectPlayer(model: MatAutocompleteSelectedEvent) {
    this.searchControl.setValue('');
    this.selected.emit(model.option.value);
  }
}
