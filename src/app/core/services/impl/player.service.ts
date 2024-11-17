// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { Player } from '../../models/player.model';
import { PLAYER_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IPlayerService } from '../interfaces/player-service.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseService<Player> implements IPlayerService {
  constructor(
    @Inject(PLAYER_REPOSITORY_TOKEN) repository: IPlayerService
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}