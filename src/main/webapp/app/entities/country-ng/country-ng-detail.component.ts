import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountryNg } from 'app/shared/model/country-ng.model';

@Component({
  selector: 'jhi-country-ng-detail',
  templateUrl: './country-ng-detail.component.html',
})
export class CountryNgDetailComponent implements OnInit {
  country: ICountryNg | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => (this.country = country));
  }

  previousState(): void {
    window.history.back();
  }
}
