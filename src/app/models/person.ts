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
  