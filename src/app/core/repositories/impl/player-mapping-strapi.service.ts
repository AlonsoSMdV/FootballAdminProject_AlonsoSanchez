import { Injectable } from "@angular/core"
import { StrapiMedia } from "../../services/impl/strapi-media.service"
import { Player } from "../../models/player.model"
import { IBaseMapping } from "../intefaces/base-mapping.interface"
import { Paginated } from "../../models/paginated.model"
import { LeagueRaw } from "./league-maping-strapi.service"


interface MediaRaw{
    data: StrapiMedia
}

interface TeamRaw{
    data: Data
}

interface TeamData{
    id: number
    attributes: TeamAttributes
}

interface TeamAttributes{
    name: string
    numberOfPlayers: number
    league: LeagueRaw | number | null
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
}

interface PlayerRaw{
    data: Data
}

interface Data{
    id: number
    attributes: PlayerAttributes
}

interface PlayerData{
    data: PlayerAttributes
}

interface PlayerAttributes{
    name: string
    firstSurname: string;
    secondSurname: string;
    birthdate: Date;
    nationality: string;
    dorsal: number;
    position: string;
    team: TeamRaw | number | null;
}

export interface Meta{}

@Injectable({
    providedIn: 'root'
})
export class PlayerMappingStrapi implements IBaseMapping<Player> {


    setAdd(data: Player):PlayerData {
        return {
            data:{
                name: data.name,
                firstSurname: data.firstSurname,
                secondSurname: data.secondSurname,
                birthdate: data.birthdate,
                nationality: data.nationality,
                dorsal: data.dorsal,
                position: data.position,
                team: data.teamId?Number(data.teamId):null
            }
        };
    }
    setUpdate(data: Player):PlayerData {
        const mappedData: Partial<PlayerAttributes> = {} 
        Object.keys(data).forEach(key=>{
            switch(key){
                case 'name': mappedData.name=data[key];
                break;
                case 'firstSurname': mappedData.firstSurname=data[key];
                break;
                case 'secondSurname': mappedData.secondSurname=data[key];
                break;
                case 'birthdate': mappedData.birthdate=data[key];
                break;
                case 'nationality': mappedData.nationality=data[key];
                break;
                case 'dorsal': mappedData.dorsal=data[key];
                break;
                case 'position': mappedData.position=data[key];
                break;
                case 'teamId': mappedData.team=data[key] ? Number(data[key]): null;
                break;
                default:
            }
        });
        return {data: mappedData as PlayerAttributes};
    }
    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Player> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Player>((d:Data)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: Data | PlayerRaw): Player {
        const isPlayerRaw = (data: Data | PlayerRaw): data is PlayerRaw => 'meta' in data;
        
        const attributes = isPlayerRaw(data) ? data.data.attributes : data.attributes;
        const id = isPlayerRaw(data) ? data.data.id : data.id;

        return {
            id: id.toString(),
            name: attributes.name,
            firstSurname: attributes.firstSurname,
            secondSurname: attributes.secondSurname,
            birthdate: attributes.birthdate,
            nationality: attributes.nationality,
            dorsal: attributes.dorsal,
            position: attributes.position,
            teamId: typeof attributes.team === 'object' ? attributes.team?.data?.id.toString() : undefined,
        };
    }
    getAdded(data: PlayerRaw):Player {
        return this.getOne(data.data);
    }
    getUpdated(data: PlayerRaw):Player {
        return this.getOne(data.data);
    }
    getDeleted(data: PlayerRaw):Player {
        return this.getOne(data.data);
    }
}
