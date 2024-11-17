// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { League } from '../../models/league.model';
import { LEAGUE_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { ILeagueService } from '../interfaces/league-service.interface';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends BaseService<League> implements ILeagueService {
  constructor(
    @Inject(LEAGUE_REPOSITORY_TOKEN) repository: ILeagueService
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}