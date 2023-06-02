export interface Product {
    id: number
    name: string
    description: string
    stock: number
    story: string
    price: number
    image: string
    video: string
    prep_time: number
    usage: string
    volume: {
        width: number
        height: number
        length: number
    }
}
