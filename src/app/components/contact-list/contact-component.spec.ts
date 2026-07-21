import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from './contact-component';
import { ContactService } from '../../services/contact.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';

describe('ContactListComponent', () => {
    let component: ContactListComponent;
    let fixture: ComponentFixture<ContactListComponent>;
    let mockContactService: any;

    beforeEach(async () => {
        mockContactService = {
            getContacts: vi.fn().mockReturnValue(of([
                { id: '1', firstName: 'Jane', lastName: 'Smith', role: 'Manager' }
            ]))
        };

        await TestBed.configureTestingModule({
            imports: [ContactListComponent],
            providers: [
                { provide: ContactService, useValue: mockContactService },
                { provide: ActivatedRoute, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load contacts on init', () => {
        expect(mockContactService.getContacts).toHaveBeenCalled();
        expect(component.contacts.length).toBe(1);
    });

    it('should filter contacts by search term', () => {
        component.searchTerm = 'Jane';
        expect(component.filteredContacts.length).toBe(1);

        component.searchTerm = 'NonExistingName';
        expect(component.filteredContacts.length).toBe(0);
    });
});