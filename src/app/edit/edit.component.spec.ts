import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { Address, Person, SearchService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let mockSearchService: SearchService;

  //-----------------
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 1 }
            }
          }
        }
      ],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();
    mockSearchService = TestBed.inject(SearchService);
  });
  //-----------------------
  it('should fetch a single record', () => {
    const fixture = TestBed.createComponent(EditComponent);
    const person = new Person({ id: 1, name: 'Michael Porter Jr.' });
    person.address = new Address({ city: 'Denver' });
    // mock response
    spyOn(mockSearchService, 'get').and.returnValue(of(person));
    // initialize component
    fixture.detectChanges();
    // verify service was called
    expect(mockSearchService.get).toHaveBeenCalledWith(1);
    // verify data was set on component when initialized
    const editComponent = fixture.componentInstance;
    expect(editComponent.person.address.city).toBe('Denver1');
    // verify HTML renders as expected
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').innerHTML).toBe('Michael Porter Jr.');
  });
  //------------------------
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //--------------------Test if it contain <h1> element and the welcome message inside it.

});
