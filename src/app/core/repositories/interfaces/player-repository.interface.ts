import { Player } from "../../models/player.model";
import { IBaseRepository } from "./base-repository.interface";

export interface IPlayerRepository extends IBaseRepository<Player>{}