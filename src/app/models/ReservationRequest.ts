export interface ReservationRequest {
    id: string
    created: Date,
    startDate: Date,
    endDate: Date,
    numberOfGuests: number,
    status: number,
    accomodationId: string,
    guestUsername: string
}