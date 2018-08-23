import { AppError } from './../../../../shared/app-error';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { League } from '../league';
import { Player } from '../../player-components/player';
import { LeagueService } from '../../../services/league.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: [ './league-form.component.scss' ]
})
export class LeagueFormComponent implements OnInit {

  @Input() model: League;
  @ViewChild('stepper') private myStepper: MatStepper;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  pairingMethods: any[] = [
    { name: 'Round Robin' },
    { name: 'Random' },
    { name: 'King of the hill' },
  ]
  //
  constructor(private _formBuilder: FormBuilder, private leagueService: LeagueService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [ '', Validators.required ]
    });
    this.secondFormGroup = this._formBuilder.group({
      pairingMethod: [ '', Validators.required ]
    });
  }
  goForward(stepper: MatStepper) {
    if (this.model.players.length % 2 != 0) {
      console.log("we need to add abuy ")
    }
    stepper.next();
  }

  addPlayer(item: Player) {
    if (!this.model.players)
      this.model.players = new Array<Player>();

    if (this.model.players.some(e => e.id === item.id))
      return;

    this.leagueService.addPlayerToLeague(item.id, this.model.id)
      .subscribe(() => {
        this.model.players.push(item)
      }, (error: AppError) => { console.log(error); });
  }

  removePlayer(item) {
    let index = this.model.players.indexOf(item);
    if (index > -1) {
      this.leagueService.removePlayerFromLeague(item.id, this.model.id)
        .subscribe(m => {
          this.model.players.splice(index, 1);
        });
    }
  }
}
