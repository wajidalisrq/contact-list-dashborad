/* 
ASSUMPTION: Simplified error handling is implemented for this exercise scope. 
In a full production environment, a global HttpInterceptor would be used 
to handle errors and display user-facing toast notifications.
*/
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
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
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private cdr = inject(ChangeDetectorRef);

    isSidebarCollapsed: boolean = false;
    contacts: Contact[] = [];
    searchTerm: string = '';

    ngOnInit(): void {
        // Load contacts list on initial component load
        this.contactService.getContacts().subscribe({
            next: (data) => {
                this.contacts = data;
                this.cdr.detectChanges();

                // AUTOMATICALLY SELECT FIRST CONTACT ON INITIAL PAGE LOAD
                // If contacts are loaded and no child route ID is selected in URL, navigate to the 1st contact
                if (this.contacts.length > 0 && !this.route.snapshot.firstChild) {
                    this.router.navigate(['/contacts', this.contacts[0].id], { replaceUrl: true });
                }
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