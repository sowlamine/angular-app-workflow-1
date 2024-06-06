import { Component, OnInit } from '@angular/core';
//import { Person} from '../models/person';
import { Person, SearchService } from '../shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query!: string;
  searchResults: Person[] = [];
  //-----
  constructor(private searchService: SearchService, private route: ActivatedRoute) { }
  //----
  ngOnInit(): void {
    const params = this.route.snapshot.params;
    if (params['term']) {
      this.query = decodeURIComponent(params['term']);
      this.search();
    }
  }
  //----
  search(): void {
    //then refactor SearchComponent to call this method with its query variable in order to include the param q
    this.searchService.search(this.query).subscribe({
      next: (data: Person[]) => {
        this.searchResults = data;
      },
      error: error => console.log(error)
    });
  }
  //----
}
