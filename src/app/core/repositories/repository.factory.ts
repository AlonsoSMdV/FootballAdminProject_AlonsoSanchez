// src/app/repositories/repository.factory.ts
import { FactoryProvider, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { IBaseRepository } from './interfaces/base-repository.interface';
import { LEAGUE_API_URL_TOKEN, LEAGUE_REPOSITORY_MAPPING_TOKEN, LEAGUE_REPOSITORY_TOKEN, LEAGUE_RESOURCE_NAME_TOKEN, TEAM_API_URL_TOKEN, TEAM_REPOSITORY_MAPPING_TOKEN, TEAM_REPOSITORY_TOKEN, TEAM_RESOURCE_NAME_TOKEN,  PLAYER_API_URL_TOKEN, PLAYER_REPOSITORY_MAPPING_TOKEN, PLAYER_REPOSITORY_TOKEN, PLAYER_RESOURCE_NAME_TOKEN, BACKEND_TOKEN, AUTH_MAPPING_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, UPLOAD_API_URL_TOKEN } from './repository.tokens';
import { BaseRespositoryLocalStorageService } from './impl/base-repository-local-storage.service';
import { Model } from '../models/base.model';
import { IBaseMapping } from './interfaces/base-mapping.interface';
import { JsonServerRepositoryService } from './impl/json-server-repository.service';
import { League } from '../models/league.model';
import { Team } from '../models/team.model';
import { Player } from '../models/player.model';
import { LeagueLocalStorageMapping } from './impl/league-mapping-local-storage.service';
import { LeagueJsonServerStorageMapping } from './impl/league-mapping-json-storage.service';
import { PlayerJsonServerStorageMapping } from './impl/player-mapping-json-storage.service';
import { TeamJsonServerStorageMapping } from './impl/team-mapping-json-storage.service';
import { BaseAuthenticationService } from '../services/impl/base-authentication.service';
import { BaseMediaService } from '../services/impl/base-media.service';
import { StrapiAuthMappingService } from '../services/impl/strapi-auth-mapping.service';
import { StrapiAuthenticationService } from '../services/impl/strapi-authntication.service';
import { StrapiMediaService } from '../services/impl/strapi-media.service';
import { IAuthMapping } from '../services/interfaces/auth-mapping.interface';
import { IStrapiAuthentication } from '../services/interfaces/strapi-authentication.interface';
import { LeagueMappingStrapi } from './impl/league-maping-strapi.service';
import { PlayerMappingStrapi } from './impl/player-mapping-strapi.service';
import { StrapiRepositoryService } from './impl/strapi.repository';
import { TeamMappingStrapi } from './impl/team-mapping-strapi.service';
// Importa otros modelos según sea necesario

export function createBaseRepositoryFactory<T extends Model>(
  token: InjectionToken<IBaseRepository<T>>,
  dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string, http: HttpClient, auth:IStrapiAuthentication, apiURL: string, resource: string, mapping: IBaseMapping<T>) => {
      switch (backend) {
        case 'http':
          return new BaseRepositoryHttpService<T>(http, auth, apiURL, resource, mapping);
        case 'local-storage':
          return new BaseRespositoryLocalStorageService<T>(resource, mapping);
        case 'json-server':
          return new JsonServerRepositoryService<T>(http, auth,apiURL, resource, mapping);
        case 'strapi':
          return new StrapiRepositoryService<T>(http, auth, apiURL, resource, mapping);
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};

type  modelType= 'league' | 'team' | 'player';

const modelTypeMapping: Record<modelType, new () => IBaseMapping<any>> = {
  league: LeagueMappingStrapi,
  team: TeamMappingStrapi,
  player: PlayerMappingStrapi,
};

export function createBaseMappingFactory<T extends Model>(
  token: InjectionToken<IBaseMapping<T>>,
  dependencies: any[],
  model: modelType
): FactoryProvider {
    return {
      provide: token,
      useFactory: (backend: string) => {
        switch (backend) {
          case 'strapi':{
            const MappingClass = modelTypeMapping[model]
            if(!MappingClass){
              throw new Error(`modelType not found`)
            }
            return new MappingClass
          }
          default:
            throw new Error('BACKEND NOT IMPLEMENTED')
      }
      deps: dependencies
    },
  };
}

export function createBaseAuthMappingFactory(token: InjectionToken<IAuthMapping>, dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string) => {
      switch (backend) {
        case 'http':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'local-storage':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'json-server':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'strapi':
          return new StrapiAuthMappingService();
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};


export const LeagueMappingFactory = createBaseMappingFactory<League>(
  LEAGUE_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'league'
);

export const TeamMappingFactory = createBaseMappingFactory<Team>(
  TEAM_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'team'
);

export const PlayerMappingFactory = createBaseMappingFactory<Player>(
  PLAYER_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'player'
);

export const AuthMappingFactory: FactoryProvider = createBaseAuthMappingFactory(AUTH_MAPPING_TOKEN, [BACKEND_TOKEN]);

export const AuthenticationServiceFactory:FactoryProvider = {
  provide: BaseAuthenticationService,
  useFactory: (backend:string, signIn:string, signUp:string, meUrl:string, mapping:IAuthMapping, http:HttpClient) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiAuthenticationService(signIn, signUp, meUrl, mapping, http);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
    
  },
  deps: [BACKEND_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_MAPPING_TOKEN, HttpClient]
};

export const MediaServiceFactory:FactoryProvider = {
  provide: BaseMediaService,
  useFactory: (backend:string, upload:string, auth:IStrapiAuthentication, http:HttpClient) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiMediaService(upload, auth, http);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
    
  },
  deps: [BACKEND_TOKEN, UPLOAD_API_URL_TOKEN, BaseAuthenticationService, HttpClient]
};

export const LeagueRepositoryFactory: FactoryProvider = {
  provide: LEAGUE_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL:string, resource:string, mapping:IBaseMapping<League>) => {
    return createJsonServerRepository<League>(http, apiURL, resource, mapping);
  },
  deps: [HttpClient, LEAGUE_API_URL_TOKEN, LEAGUE_RESOURCE_NAME_TOKEN, LEAGUE_REPOSITORY_MAPPING_TOKEN]
};

export const TeamRepositoryFactory: FactoryProvider = {
  provide: TEAM_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL:string, resource:string, mapping:IBaseMapping<Team>) => {
    return createJsonServerRepository<Team>(http, apiURL, resource, mapping);
  },
  deps: [HttpClient, TEAM_API_URL_TOKEN, TEAM_RESOURCE_NAME_TOKEN, TEAM_REPOSITORY_MAPPING_TOKEN]
};

export const PlayerRepositoryFactory: FactoryProvider = {
  provide: PLAYER_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL:string, resource:string, mapping:IBaseMapping<Player>) => {
    return createJsonServerRepository<Player>(http, apiURL, resource, mapping);
  },
  deps: [HttpClient, PLAYER_API_URL_TOKEN, PLAYER_RESOURCE_NAME_TOKEN, PLAYER_REPOSITORY_MAPPING_TOKEN]
};
function createJsonServerRepository<T>(http: HttpClient, apiURL: string, resource: string, mapping: IBaseMapping<League>) {
  throw new Error('Function not implemented.');
}

