import { Address } from "./Address"

export interface Accomodation {
    id: string
    name: string
    description: string
    price: number
    acapacity: number
    address: Address
}