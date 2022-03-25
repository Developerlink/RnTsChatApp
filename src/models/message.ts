export interface Message {
    id: string;
    uid: string;
    displayedName: string;
    text: string;
    imageUrl: string;
    createdAt: string;
    messageImageUrl?: string
}

export interface SendMessage {
    uid: string;
    displayedName: string | null;
    text: string;
    imageUrl: string | null;
    createdAt: any;
    messageImageUrl?: string
}