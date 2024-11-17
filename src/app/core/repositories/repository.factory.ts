// src/app/repositories/repository.factory.ts
import { FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { IBaseRepository } from './interfaces/base-repository.interface';
import { LEAGUE_API_URL_TOKEN, LEAGUE_REPOSITORY_MAPPING_TOKEN, LEAGUE_REPOSITORY_TOKEN, LEAGUE_RESOURCE_NAME_TOKEN, TEAM_API_URL_TOKEN, TEAM_REPOSITORY_MAPPING_TOKEN, TEAM_REPOSITORY_TOKEN, TEAM_RESOURCE_NAME_TOKEN,  PLAYER_API_URL_TOKEN, PLAYER_REPOSITORY_MAPPING_TOKEN, PLAYER_REPOSITORY_TOKEN, PLAYER_RESOURCE_NAME_TOKEN } from './repository.tokens';
import { BaseRespositoryLocalStorageService } from './impl/base-repository-local-storage.service';
import { Model } from '../models/base.model';
import { IBaseMapping } from './interfaces/base-mapping.interface';
import { JsonServerRepositoryService } from './impl/json-server-repository.service';
import { League } from '../models/league.model';
import { Team } from '../models/team.model';
import { Player } from '../models/player.model';
// Importa otros modelos según sea necesario

export function createHttpRepository<T extends Model>(http: HttpClient, apiUrl: string, resource:string, mapping:IBaseMapping<T>): IBaseRepository<T> {
  return new BaseRepositoryHttpService<T>(http, apiUrl, resource, mapping);
}

export function createLocalStorageRepository<T extends Model>(resource: string, mapping:IBaseMapping<T>): IBaseRepository<T> {
  return new BaseRespositoryLocalStorageService<T>(resource, mapping);
}

export function createJsonServerRepository<T extends Model>(http: HttpClient, apiUrl: string, resource:string, mapping:IBaseMapping<T>): IBaseRepository<T> {
  return new JsonServerRepositoryService<T>(http, apiUrl, resource, mapping);
}


// Ejemplo de configuración para People
export const LeagueRepositoryFactory: FactoryProvider = {
  provide: LEAGUE_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL:string, resource:string, mapping:IBaseMapping<League>) => {
    // Aquí puedes decidir qué implementación usar
    // Por ejemplo, usar Firebase:
    //return createHttpRepository<Person>(http, apiURL);
    return createJsonServerRepository<League>(http, apiURL, resource, mapping);
  },
  deps: [HttpClient, LEAGUE_API_URL_TOKEN, LEAGUE_RESOURCE_NAME_TOKEN, LEAGUE_REPOSITORY_MAPPING_TOKEN]
};

// Ejemplo de configuración para People
export const TeamRepositoryFactory: FactoryProvider = {
  provide: TEAM_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL:string, resource:string, mapping:IBaseMapping<Team>) => {
    // Aquí puedes decidir qué implementación usar
    // Por ejemplo, usar Firebase:
    //return createHttpRepository<Person>(http, apiURL);
    return createJsonServerRepository<Team>(http, apiURL, resource, mapping);
  },
  deps: [HttpClient, TEAM_API_URL_TOKEN, TEAM_RESOURCE_NAME_TOKEN, TEAM_REPOSITORY_MAPPING_TOKEN]
};

// Ejemplo de configuración para People
export const PlayerRepositoryFactory: FactoryProvider = {
  provide: PLAYER_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL:string, resource:string, mapping:IBaseMapping<Player>) => {
    // Aquí puedes decidir qué implementación usar
    // Por ejemplo, usar Firebase:
    //return createHttpRepository<Person>(http, apiURL);
    return createJsonServerRepository<Player>(http, apiURL, resource, mapping);
  },
  deps: [HttpClient, PLAYER_API_URL_TOKEN, PLAYER_RESOURCE_NAME_TOKEN, PLAYER_REPOSITORY_MAPPING_TOKEN]
};

// Repite esto para otros modelos como Usuario, etc.