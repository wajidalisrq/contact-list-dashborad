import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';
import { Contact, ContactEmail } from '../../models/contact.model';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
    selector: 'app-contact-details',
    standalone: true,
    imports: [CommonModule, SkeletonLoaderComponent],
    templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private contactService = inject(ContactService);
    private cdr = inject(ChangeDetectorRef);

    contact: Contact | null = null;
    emails: ContactEmail[] = [];
    isLoading: boolean = true;

    ngOnInit(): void {
        // Watch for URL route parameter changes to load selected contact details
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.loadContactData(id);
            }
        });
    }

    loadContactData(id: string): void {
        this.isLoading = true;
        this.contact = null;
        this.emails = [];
        this.cdr.detectChanges();

        // Fetch selected contact profile details
        // Small delay added to smoothly show skeleton loader UI
        this.contactService.getContactById(id)
            .pipe(delay(600))
            .subscribe({
                next: (data) => {
                    this.contact = data;
                    this.isLoading = false;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.isLoading = false;
                    this.cdr.detectChanges();
                }
            });

        // Fetch associated emails for the selected contact
        this.contactService.getContactEmails(id)
            .pipe(delay(600))
            .subscribe({
                next: (emailData) => {
                    this.emails = emailData;
                    this.cdr.detectChanges();
                }
            });
    }
}