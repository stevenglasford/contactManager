import { Injectable } from '@angular/core';
import {Contact} from './contact';
import {ListContact} from './listContact';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    constructor(private http: HttpClient){}
    private contactsUrl = 'https://studentdata-5330a.firebaseio.com/homework3/contact';

    addContact(newCnt: Contact){
        return this.http.post('https://studentdata-5330a.firebaseio.com/homework3/'+
        'contact.json', newCnt);
    }

    deleteContact(contactId: string): Observable<ListContact>{
        const url = `${this.contactsUrl}/${contactId}.json`;
        return this.http.delete<ListContact>(url);
        
    }

    updateContact(contact: ListContact){
        const newContact: Contact = {
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            mail: contact.mail
        }
        this.addContact(newContact);
        this.deleteContact(contact.id);
    }
    // deleteContactEntry(delCnt: string){
    //     //return this.http.delete('https://studentdata-5330a.firebaseio.com/homework3/contact/' +
    //     //   delCnt + '.json')
    // }

    getContacts(){
        return this.http.get<Contact[]>('https://studentdata-5330a.firebaseio.com/homework3/' + 
        'contact.json')
        .pipe(map(responseData => {
            const keyArray: string[] = [];
            const contactArray: Contact[] = [];
            for(const key in responseData){
                keyArray.push(key);
                contactArray.push(responseData[key]);
            }
            return {contactArray, keyArray};
        }))
    } 
}