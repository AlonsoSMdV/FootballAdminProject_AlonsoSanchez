import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { League } from 'src/app/core/models/league.model';
import { LeagueService } from 'src/app/core/services/impl/league.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.page.html',
  styleUrls: ['./leagues.page.scss'],
})
export class LeaguesPage implements OnInit {

  _leagues: BehaviorSubject<League[]> = new BehaviorSubject<League[]>([]);
  leagues$: Observable<League[]> = this._leagues.asObservable();

  constructor(
    private leagueSvc: LeagueService
  ) { }

  ngOnInit() {
  }


  selectedLeague: any = null
  page: number = 1;
  

}
