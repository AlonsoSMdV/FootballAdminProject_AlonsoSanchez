// src/app/repositories/repository.tokens.ts
import { InjectionToken } from '@angular/core';

import { IBaseRepository } from './interfaces/base-repository.interface';
import { ILeagueRepository } from './interfaces/league-repository.interface';
import { ITeamRepository } from './interfaces/team-repository.interface';
import { IPlayerRepository } from './interfaces/player-repository.interface';
import { IBaseMapping } from './interfaces/base-mapping.interface';
import { League } from '../models/league.model';
import { Player } from '../models/player.model';
import { Team } from '../models/team.model';


export const RESOURCE_NAME_TOKEN = new InjectionToken<string>('ResourceName');
export const LEAGUE_RESOURCE_NAME_TOKEN = new InjectionToken<string>('LeagueResourceName');
export const TEAM_RESOURCE_NAME_TOKEN = new InjectionToken<string>('TeamResourceName');
export const PLAYER_RESOURCE_NAME_TOKEN = new InjectionToken<string>('PlayerResourceName');
export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('REPOSITORY_TOKEN');
export const LEAGUE_REPOSITORY_TOKEN = new InjectionToken<ILeagueRepository>('ILeagueRepository');
export const PLAYER_REPOSITORY_TOKEN = new InjectionToken<IPlayerRepository>('IPlayerRepository');
export const TEAM_REPOSITORY_TOKEN = new InjectionToken<ITeamRepository>('ITeamRepository');

export const API_URL_TOKEN = new InjectionToken<string>('ApiUrl');
export const LEAGUE_API_URL_TOKEN = new InjectionToken<string>('LeagueApiUrl');
export const TEAM_API_URL_TOKEN = new InjectionToken<string>('TeamApiUrl');
export const PLAYER_API_URL_TOKEN = new InjectionToken<string>('PlayerApiUrl');
export const TASKS_API_URL_TOKEN = new InjectionToken<string>('TasksApiUrl');

export const REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<any>>('IBaseRepositoryMapping');
export const LEAGUE_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<League>>('ILeaguesRepositoryMapping');
export const PLAYER_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Player>>('IPlayerRepositoryMapping');
export const TEAM_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Team>>('ITeamRepositoryMapping');