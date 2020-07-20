import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentNg } from 'app/shared/model/department-ng.model';

@Component({
  selector: 'jhi-department-ng-detail',
  templateUrl: './department-ng-detail.component.html',
})
export class DepartmentNgDetailComponent implements OnInit {
  department: IDepartmentNg | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => (this.department = department));
  }

  previousState(): void {
    window.history.back();
  }
}
