import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { League } from "../../models/league.model";

interface LeagueRaw{
    id: string
    name: string
}
@Injectable({
    providedIn: 'root'
  })
  export class LeagueLocalStorageMapping implements IBaseMapping<League> {
    setAdd(data: League) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize:number, pages:number, data: LeagueRaw[]): Paginated<League> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<League>((d:LeagueRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: any): League {
        return {
            id:data.id, 
            name:data.name,
        }
    }
    getAdded(data: LeagueRaw): League {
        return this.getOne(data);
    }
    getUpdated(data: LeagueRaw): League {
        return this.getOne(data);
    }
    getDeleted(data: LeagueRaw): League {
        return this.getOne(data);
    }

    
  }