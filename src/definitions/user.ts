export interface User {
    id: number
    name: string
    username: string
    email: string
    password: string
    adm: boolean
    phone: string
    addresses: Address[]
}

export interface Address {
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

export interface Card {
    number: string
    name: string
    expiration: string
    cvv: string
}
