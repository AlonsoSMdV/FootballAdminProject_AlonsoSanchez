export interface SignInPayload{
    email:string,
    password:string
}

export interface SignUpPayload{
    email:string,
    password:string,
    name:string,
    surname:string,
    birthDate:string,
    gender:string,
    group:string,
    user:string
}

export interface User{
    name: string
    surname: string
    userId: any
    id:string,
    username:string,
    email:string
}