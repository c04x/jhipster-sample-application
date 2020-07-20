import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationNg } from 'app/shared/model/location-ng.model';

@Component({
  selector: 'jhi-location-ng-detail',
  templateUrl: './location-ng-detail.component.html',
})
export class LocationNgDetailComponent implements OnInit {
  location: ILocationNg | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => (this.location = location));
  }

  previousState(): void {
    window.history.back();
  }
}
