import { Address } from "./Address"

export interface AccomodationSearch{
id: string
name: string
description: string
price: number
capacity: number
address: Address
availableFromDate: Date
availableToDate: Date

}