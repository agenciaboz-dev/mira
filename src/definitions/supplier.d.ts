declare interface Supplier {
    id: number
    code: string
    name: string
    document: string
    contact: string
    products?: Product[]
}
