 interface Rating{
    rate:number,
    count:number
}
export default interface Product{
    category:string,
    description: string
    id:number,
    image:string,
    price:number,
    rating:Rating,
    title:string
}