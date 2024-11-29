import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { League } from 'src/app/core/models/league.model';
import { Paginated } from 'src/app/core/models/paginated.model';
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
  pageSize:number = 25;
  
  getMoreLeagues(notify: HTMLIonInfiniteScrollElement | null = null){
    this.leagueSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response: Paginated<League>)=>{
        this._leagues.next([...this._leagues.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }
}
