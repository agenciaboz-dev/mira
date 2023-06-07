declare interface Product {
    id: number
    name: string
    description: string
    stock: number | string
    story: string
    price: number | string
    image: string
    video: string
    usage: string
    weight: number | string
    width: number | string
    height: number | string
    length: number | string
    preparation: number
    categories?: Category[]
}
