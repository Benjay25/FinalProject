export interface Advert{
    id?:number,    
    userId: number,
    title: string,
    province: string,
    city: string,
    details: string,
    price: number,
    status: string,
    featured: boolean
}