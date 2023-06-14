declare interface User {
    id: number
    name: string
    cpf: string
    username: string
    email: string
    password: string
    adm: boolean
    phone: string
    addresses: Address[]
    cards: Card[]
}

declare interface Address {
    id: number
    receiver: string
    phone: string
    cep: string
    address: string
    number: number
    complement?: string
    district: string
    city: string
    uf: string
}

declare interface Card {
    id: number
    number: string
    name: string
    expiration_month: string
    expiration_year: string
    cvv: string
    type: string
}
