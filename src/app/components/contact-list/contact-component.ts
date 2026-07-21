import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
    selector: 'app-contact-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact-component.scss'
})
export class ContactListComponent implements OnInit {
    private contactService = inject(ContactService);
    private cdr = inject(ChangeDetectorRef);

    contacts: Contact[] = [];
    searchTerm: string = '';

    ngOnInit(): void {
        // Load contacts list on initial component load
        this.contactService.getContacts().subscribe({
            next: (data) => {
                this.contacts = data;
                // Force UI change detection after data loads
                this.cdr.detectChanges();
            },
            error: (err) => console.error('Error fetching contacts:', err)
        });
    }

    // Filter contacts in real-time by name or role
    get filteredContacts(): Contact[] {
        if (!this.searchTerm.trim()) return this.contacts;
        return this.contacts.filter(c =>
            `${c.firstName} ${c.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            c.role.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    // Update search keyword on input change
    onSearch(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.searchTerm = input.value;
        this.cdr.detectChanges();
    }
}