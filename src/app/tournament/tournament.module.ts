import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TournamentFormComponent } from './components/tournament/tournament-form/tournament-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LeagueFormComponent } from './components/league-components/league-form/league-form.component';
import { TouramentDetailsComponent } from './components/tournament/tourament-details/tourament-details.component';
import { PlayerSearchComponent } from './components/player-components/player-search/player-search.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: TournamentFormComponent },
      { path: ':id', component: TouramentDetailsComponent },
    ])
  ],
  exports: [],
  declarations: [ TournamentFormComponent, TouramentDetailsComponent, LeagueFormComponent, PlayerSearchComponent ]
})
export class TournamentModule { }
