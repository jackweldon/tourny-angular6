import { switchMap } from 'rxjs/operators';
import { Tournament } from './../tournament';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-tourament-details',
  templateUrl: './tourament-details.component.html',
  styleUrls: [ './tourament-details.component.scss' ]
})
export class TouramentDetailsComponent implements OnInit {

  model: Tournament;

  constructor(private route: ActivatedRoute, private tournService: TournamentService) {


  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.tournService.getById(+params.get('id'));
      })
    ).subscribe((res: Tournament) => {
      this.model = res
    });
  }

}
