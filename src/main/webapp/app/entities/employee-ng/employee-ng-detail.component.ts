import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeNg } from 'app/shared/model/employee-ng.model';

@Component({
  selector: 'jhi-employee-ng-detail',
  templateUrl: './employee-ng-detail.component.html',
})
export class EmployeeNgDetailComponent implements OnInit {
  employee: IEmployeeNg | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => (this.employee = employee));
  }

  previousState(): void {
    window.history.back();
  }
}
