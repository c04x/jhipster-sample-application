import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobHistoryNg } from 'app/shared/model/job-history-ng.model';

@Component({
  selector: 'jhi-job-history-ng-detail',
  templateUrl: './job-history-ng-detail.component.html',
})
export class JobHistoryNgDetailComponent implements OnInit {
  jobHistory: IJobHistoryNg | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => (this.jobHistory = jobHistory));
  }

  previousState(): void {
    window.history.back();
  }
}
