import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Player } from "../../models/player.model";

interface PlayerRaw{
    id: string
    name: string
    surname: string
    age: number
    nationality: string
    dorsal: number
    position:string
    teamId: string

}

@Injectable({
    providedIn: 'root'
  })
  export class JsonServerStorageMapping implements IBaseMapping<Player> {
    setAdd(data: Player) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize: number, pages:number, data:PlayerRaw[]): Paginated<Player> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Player>((d:PlayerRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: PlayerRaw):Player {
        return {
            id:data.id, 
            name:data.name, 
            surname:data.surname,
            age:data.age,
            nationality:data.nationality,
            dorsal:data.dorsal,
            position:data.position,
            teamId:data.teamId,
        };
    }
    getAdded(data: any):Player {
        throw new Error("Method not implemented.");
    }
    getUpdated(data: any):Player {
        throw new Error("Method not implemented.");
    }
    getDeleted(data: any):Player {
        throw new Error("Method not implemented.");
    }
  }