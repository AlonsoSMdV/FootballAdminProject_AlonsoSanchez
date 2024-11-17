import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Player } from "../../models/player.model";

interface PlayerRaw{
    id: string
    nombre: string
    apellidos: string
    edad: number
    nacionalidad: string
    dorsal: number
    posicion:string
    idEquipo: string

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
            name:data.nombre, 
            surname:data.apellidos,
            age:data.edad,
            nationality:data.nacionalidad,
            dorsal:data.dorsal,
            position:data.posicion,
            teamId:data.idEquipo,
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