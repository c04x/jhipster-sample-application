import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobNg } from 'app/shared/model/job-ng.model';

@Component({
  selector: 'jhi-job-ng-detail',
  templateUrl: './job-ng-detail.component.html',
})
export class JobNgDetailComponent implements OnInit {
  job: IJobNg | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => (this.job = job));
  }

  previousState(): void {
    window.history.back();
  }
}
