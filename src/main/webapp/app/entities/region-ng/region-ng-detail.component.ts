import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegionNg } from 'app/shared/model/region-ng.model';

@Component({
  selector: 'jhi-region-ng-detail',
  templateUrl: './region-ng-detail.component.html',
})
export class RegionNgDetailComponent implements OnInit {
  region: IRegionNg | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => (this.region = region));
  }

  previousState(): void {
    window.history.back();
  }
}
