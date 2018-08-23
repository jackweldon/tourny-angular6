import { TournamentService, TournamentCreateModel } from './../../../services/tournament.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Tournament } from '../tournament';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: [ './tournament-form.component.scss' ],
  animations: [
    trigger('animationOption2', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0 }))
      ]),
    ])
  ],
})
export class TournamentFormComponent implements OnInit {

  tournForm: FormGroup;

  constructor(private tournService: TournamentService, fb: FormBuilder, private router: Router) {
    this.tournForm = fb.group({
      name: [ '', Validators.required ],
      leagueNames: fb.array([], [ Validators.required ]),
      startDate: [],
      endDate: [],
      id: [],
      description: [],
      streamUrl: []
    });

  }


  ngOnInit() {
  }

  addLeague(league: HTMLInputElement) {
    if (!league.value)
      return;

    (this.leagues as FormArray).push(new FormControl(league.value));
    league.value = '';
  }

  removeLeague(league: FormControl) {
    let index = (this.leagues as FormArray).controls.indexOf(league);
    (this.leagues as FormArray).removeAt(index);
  }

  get metaComplete() {
    return this.tournForm.get('name').value;
  }

  get leagues() {
    return this.tournForm.get('leagueNames');
  }

  get id() {
    return this.tournForm.get('id');
  }

  create() {
    if (!this.tournForm.valid) {
      return;
    }
    const tournamentModel = this.tournForm.value as TournamentCreateModel;
    this.tournService.create(tournamentModel).subscribe((response: Tournament) => {
      this.router.navigate([ '/tournament', response.id ]);
    });
  }
}
