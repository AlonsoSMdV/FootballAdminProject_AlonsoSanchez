import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { JsonServerStorageMapping } from './core/repositories/impl/league-mapping-json-storage.service';
import { LeagueRepositoryFactory, TeamRepositoryFactory, PlayerRepositoryFactory } from './core/repositories/repository.factory';
import { LEAGUE_API_URL_TOKEN, LEAGUE_REPOSITORY_MAPPING_TOKEN, LEAGUE_REPOSITORY_TOKEN, LEAGUE_RESOURCE_NAME_TOKEN, 
  TEAM_API_URL_TOKEN, TEAM_REPOSITORY_MAPPING_TOKEN, TEAM_REPOSITORY_TOKEN, TEAM_RESOURCE_NAME_TOKEN, 
  PLAYER_API_URL_TOKEN, PLAYER_REPOSITORY_MAPPING_TOKEN, PLAYER_REPOSITORY_TOKEN,PLAYER_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { LeagueService } from './core/services/impl/league.service';
import { PlayerService } from './core/services/impl/player.service';
import { TeamService } from './core/services/impl/team.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),

    {provide: LEAGUE_RESOURCE_NAME_TOKEN, useValue: 'ligas'},
    {provide: TEAM_RESOURCE_NAME_TOKEN, useValue: 'equipos'},
    {provide: PLAYER_RESOURCE_NAME_TOKEN, useValue: 'jugadores'},
    {provide: LEAGUE_API_URL_TOKEN, useValue: 'http://localhost:3000'},
    {provide: TEAM_API_URL_TOKEN, useValue: 'http://localhost:3000'},
    {provide: PLAYER_API_URL_TOKEN, useValue: 'http://localhost:3000'},

    {
      provide: LEAGUE_REPOSITORY_MAPPING_TOKEN,
      useClass: JsonServerStorageMapping
    },
    {
      provide: TEAM_REPOSITORY_MAPPING_TOKEN,
      useClass: JsonServerStorageMapping
    },
    {
      provide: PLAYER_REPOSITORY_MAPPING_TOKEN,
      useClass: JsonServerStorageMapping
    },
    LeagueRepositoryFactory,
    TeamRepositoryFactory,
    PlayerRepositoryFactory,
    {
      provide: 'LeagueService',
      useClass:LeagueService
    },{
      provide: 'TeamService',
      useClass:TeamService
    },{
      provide: 'PlayerService',
      useClass:PlayerService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
