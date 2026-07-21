import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, ContactEmail } from '../models/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private http = inject(HttpClient);

    // Mock API base URL for fetching contacts and email endpoints
    private baseUrl = 'https://6a5f6c14b1933e9d25fc4569.mockapi.io/api/v1';

    // Fetch all contacts list for the main dashboard
    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(`${this.baseUrl}/contacts`);
    }

    // Fetch single contact details by ID
    getContactById(id: string): Observable<Contact> {
        return this.http.get<Contact>(`${this.baseUrl}/contacts/${id}`);
    }

    // Fetch nested emails for a specific contact as per exercise requirements
    getContactEmails(contactId: string): Observable<ContactEmail[]> {
        return this.http.get<ContactEmail[]>(`${this.baseUrl}/contacts/${contactId}/email_addresses`);
    }
}