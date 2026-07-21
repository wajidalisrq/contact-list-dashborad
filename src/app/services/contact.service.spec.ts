import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { Contact } from '../models/contact.model';

describe('ContactService', () => {
    let service: ContactService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ContactService]
        });
        service = TestBed.inject(ContactService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch contacts list via GET', () => {
        const mockContacts: Contact[] = [
            { id: '1', firstName: 'John', lastName: 'Doe', role: 'Developer' } as Contact
        ];

        service.getContacts().subscribe(contacts => {
            expect(contacts.length).toBe(1);
            expect(contacts).toEqual(mockContacts);
        });

        const req = httpMock.expectOne(`${service['baseUrl']}/contacts`);
        expect(req.request.method).toBe('GET');
        req.flush(mockContacts);
    });
});