import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { League } from "../../models/league.model";

interface LeagueRaw{
    id: string
    nombre: string
}

@Injectable({
    providedIn: 'root'
  })
  export class JsonServerStorageMapping implements IBaseMapping<League> {
    setAdd(data: League) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize: number, pages:number, data:LeagueRaw[]): Paginated<League> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<League>((d:LeagueRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: LeagueRaw):League {
        return {
            id:data.id, 
            name:data.nombre, 
        };
    }
    getAdded(data: any):League {
        throw new Error("Method not implemented.");
    }
    getUpdated(data: any):League {
        throw new Error("Method not implemented.");
    }
    getDeleted(data: any):League {
        throw new Error("Method not implemented.");
    }
  }