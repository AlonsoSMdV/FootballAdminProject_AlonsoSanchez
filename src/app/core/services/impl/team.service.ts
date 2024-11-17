// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { Team } from '../../models/team.model';
import { TEAM_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { ITeamService } from '../interfaces/team-service.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService<Team> implements ITeamService {
  constructor(
    @Inject(TEAM_REPOSITORY_TOKEN) repository: ITeamService
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}