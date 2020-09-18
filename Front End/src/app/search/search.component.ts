import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Filters } from '@app/_models/filters';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  locations: any;
  provincesArr: String[] = [];
  citiesArr: String[] = [];
  errorMessage: string;
  orderBy: string = '';
  filters: Filters;
  prices: number[] = [ 100000, 200000, 400000, 600000, 800000, 1000000, 1500000, 2000000, 4000000, 6000000, 8000000, 10000000, 20000000, 40000000, 60000000, 80000000, 100000000];

  constructor(private fb: FormBuilder, private advertService: AdvertService, private router: Router, private route: ActivatedRoute) { }

  @Output() filtersEvent: EventEmitter<Filters> = new EventEmitter<Filters>();
  @Output() clearFilters: EventEmitter<Filters> = new EventEmitter<Filters>();

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keywords: [''],
      province: [''],
      city: [''],
      maxPrice: [''],
      minPrice: ['']
    });

    this.locations = this.advertService.getLocation().subscribe(
      value => {
        this.locations = value;
        for (const key in this.locations.provinceList) {
          this.provincesArr.push(key);
        }
        this.updateCities();
      }
    )
  }

  orderByToggle(order: string):void {
    if (this.orderBy == '' || this.orderBy != order)
      this.orderBy = order;
    else if (this.orderBy == order)
      this.orderBy = '';
  }
  submit(): void {
    this.filters = {
      "province": this.searchForm.get("province").value,
      "city"    : this.searchForm.get("city").value,
      "maxPrice": +this.searchForm.get("maxPrice").value,
      "minPrice": +this.searchForm.get("minPrice").value,
      "keywords": this.searchForm.get("keywords").value,
      "order"   : this.orderBy
    };
    console.log("1: "+JSON.stringify(this.filters));
    this.filtersEvent.emit(this.filters);
  }

  clear(): void {
    this.searchForm.patchValue({
      province: "",
      city: "",
      keywords: "",
      maxPrice: "",
      minPrice: ""
    });
    this.orderBy = '';
    this.clearFilters.emit();
  }
  updateCities(): void {
    this.citiesArr = this.locations.provinceList[this.searchForm.get('province').value];
  }
}
