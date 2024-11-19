import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Team } from "../../models/team.model";

interface TeamRaw{
    id: string
    nombre: string
    jugadoresEnPlantilla: number
    idLiga: string
}

@Injectable({
    providedIn: 'root'
  })
  export class JsonServerStorageMapping implements IBaseMapping<Team> {
    setAdd(data: Team):TeamRaw {
        return {
            id:data.id, 
            nombre:data.name, 
            jugadoresEnPlantilla:data.numberOfPlayers,
            idLiga:data.leagueId,
        };
    }
    setUpdate(data: Team):TeamRaw {
        let toReturn:any = {};
        Object.keys(data).forEach(key => {
            switch (key) {
                case 'name': toReturn['nombre']=data[key];
                    break;
                case 'numberOfPlayers': toReturn['jugadoresEnPlantilla']=data[key];
                    break;
                case 'leagueId': toReturn['idLiga']=data[key];
                    break;
                default:
                    break;
            }
        });
        return toReturn;
    }
    getPaginated(page:number, pageSize: number, pages:number, data:TeamRaw[]): Paginated<Team> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Team>((d:TeamRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: TeamRaw):Team {
        return {
            id:data.id, 
            name:data.nombre, 
            numberOfPlayers:data.jugadoresEnPlantilla,
            leagueId:data.idLiga,
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