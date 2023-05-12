export interface User {
    id: number
    name: string
    username: string
    email: string
    password: string
    adm: boolean
    phone: string
    address: Address[]
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
