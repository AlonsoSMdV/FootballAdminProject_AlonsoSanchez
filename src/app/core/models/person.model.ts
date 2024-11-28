// src/app/core/person.model.ts
import { Model } from "./base.model";

export interface Person extends Model{
    name:string,
    surname:string,
    email?:string, 
    picture?:{
        url:string | undefined,
        large:string | undefined,
        medium:string | undefined,
        small:string | undefined,
        thumbnail:string | undefined
    },
    userId?:string
}