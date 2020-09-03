export interface Advert{
    id?:number;
    email: string,
    title: string,
    province: string,
    city: string,
    details: string,
    price: number,
    hidden: boolean,
    date?: string
}