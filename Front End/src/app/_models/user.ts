export interface User{
    id?:number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber?: string;
    admin: boolean;
    locked: boolean;
    token?: string;
}