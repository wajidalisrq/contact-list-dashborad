export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar: string;
    bio?: string;
    phone?: string;
    dial?: string;
    meetingUrl?: string;
    status?: 'online' | 'busy' | 'offline'; // Green/Orange/Red dot on list
}

export interface ContactEmail {
    id: string;
    contactId: string;
    email: string;
    isPrimary: boolean;
}