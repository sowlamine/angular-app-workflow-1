import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  //-----Get all
  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>('assets/data/people.json');
  }
  //-----Get all the person by search
  search(q: string): Observable<Person[]> {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    //----updated objects in localStorage.
    return this.getAll().pipe(
      map((data: Person[]) => data
        .map((item: Person) => !!localStorage['person' + item.id] ?
          JSON.parse(localStorage['person' + item.id]) : item)
        .filter((item: Person) => JSON.stringify(item).toLowerCase().includes(q))
      ));
  }
  //----------Get person by ID
  get(id: number): Observable<Person> {
    return this.getAll().pipe(map((all: Person[]) => {
      if (localStorage['person' + id]) {
        return JSON.parse(localStorage['person' + id]);
      }
      return all.find((e: Person) => e.id === id);
    }));
  }
  //-----------Save the person
  save(person: Person) {
    localStorage['person' + person.id] = JSON.stringify(person);
  }
}
//------Address Model
export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  constructor(address: Partial<Address> = {}) {
    this.street = address?.street || '';
    this.city = address?.city || '';
    this.state = address?.state || '';
    this.zip = address?.zip || '';
  }
}
//-------Person Model
export class Person {
  id: number | null;
  name: string;
  phone: string;
  address: Address;
  constructor(person: Partial<Person> = {}) {
    this.id = person?.id || null;
    this.name = person?.name || '';
    this.phone = person?.phone || '';
    this.address = person?.address || new Address();
  }
}
