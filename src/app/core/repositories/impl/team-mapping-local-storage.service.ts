import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { League } from "../../models/league.model";
import { Team } from "../../models/team.model";

interface TeamRaw{
    id: string
    name: string
    numberOfPlayers: number
    leagueId: string
}

@Injectable({
    providedIn: 'root'
  })
  export class JsonServerStorageMapping implements IBaseMapping<Team> {
    setAdd(data: League) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize: number, pages:number, data:TeamRaw[]): Paginated<Team> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Team>((d:TeamRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: TeamRaw):Team {
        return {
            id:data.id, 
            name:data.name, 
            numberOfPlayers:data.numberOfPlayers,
            leagueId:data.leagueId,
        };
    }
    getAdded(data: any):Team {
        throw new Error("Method not implemented.");
    }
    getUpdated(data: any):Team {
        throw new Error("Method not implemented.");
    }
    getDeleted(data: any):Team {
        throw new Error("Method not implemented.");
    }
  }