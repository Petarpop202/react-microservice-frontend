export interface Notification {
    id: string
    created: Date,
    type: number,
    text: string,
    userId: string,
    isRead: boolean
}