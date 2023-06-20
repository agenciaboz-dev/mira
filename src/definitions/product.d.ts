declare interface Product {
    id: number
    name: string
    description: string
    brand: string
    stock: number | string
    stock_warehouse: number | string
    stock_type: number | string
    profit: number | string
    story: string
    price: number | string
    cost: number | string
    image: string
    video: string
    usage: string
    weight: number | string
    width: number | string
    height: number | string
    length: number | string
    preparation: number
    prep_unit: number
    supplier: Supplier
    categories?: Category[]
}

declare interface orderProduct extends Product {
    quantity: number
    product: Product
}
