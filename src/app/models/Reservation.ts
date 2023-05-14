export interface Reservation {
    id: string
    created: Date,
    startDate: Date,
    endDate: Date,
    numberOfGuests: number,
    accomodationId: string,
    guestId: string
}