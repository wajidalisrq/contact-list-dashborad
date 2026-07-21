import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'contacts', pathMatch: 'full' },
    {
        path: 'contacts',
        component: ContactListComponent,
        children: [
            { path: ':id', component: ContactDetailsComponent }
        ]
    },
    { path: '**', redirectTo: 'contacts' }
];