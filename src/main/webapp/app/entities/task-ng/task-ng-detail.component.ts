import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskNg } from 'app/shared/model/task-ng.model';

@Component({
  selector: 'jhi-task-ng-detail',
  templateUrl: './task-ng-detail.component.html',
})
export class TaskNgDetailComponent implements OnInit {
  task: ITaskNg | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => (this.task = task));
  }

  previousState(): void {
    window.history.back();
  }
}
