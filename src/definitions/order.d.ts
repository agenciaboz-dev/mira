declare interface Order {
    id: number
    products: orderProduct[]
    name: string
    cpf: string
    user: User
    delivery: boolean
    status: number
    date: string
    method: "card" | "pix"
    address: Address
    value: number
    error?: string
}
