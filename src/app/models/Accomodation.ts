import { Address } from "./Address"

export interface Accomodation {
  id: string
  hostId: string
  name: string
  description: string
  pricePerGuest: boolean
  price: number
  minCapacity: number
  maxCapacity: number
  address: Address
  pictureUrl: string
  availableFromDate: Date
  availableToDate: Date
  isAutomaticConfirm: boolean
}
