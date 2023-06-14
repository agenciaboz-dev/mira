declare interface Order {
    id: number
    products: Product[]
    user: User
    delivery: boolean
    status: number
    date: string
    method: "card" | "pix"
    address: Address
}
