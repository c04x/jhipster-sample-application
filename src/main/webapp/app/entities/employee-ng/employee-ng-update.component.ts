import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEmployeeNg, EmployeeNg } from 'app/shared/model/employee-ng.model';
import { EmployeeNgService } from './employee-ng.service';
import { IDepartmentNg } from 'app/shared/model/department-ng.model';
import { DepartmentNgService } from 'app/entities/department-ng/department-ng.service';

type SelectableEntity = IEmployeeNg | IDepartmentNg;

@Component({
  selector: 'jhi-employee-ng-update',
  templateUrl: './employee-ng-update.component.html',
})
export class EmployeeNgUpdateComponent implements OnInit {
  isSaving = false;
  employees: IEmployeeNg[] = [];
  departments: IDepartmentNg[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    hireDate: [],
    salary: [],
    commissionPct: [],
    managerId: [],
    departmentId: [],
  });

  constructor(
    protected employeeService: EmployeeNgService,
    protected departmentService: DepartmentNgService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      if (!employee.id) {
        const today = moment().startOf('day');
        employee.hireDate = today;
      }

      this.updateForm(employee);

      this.employeeService.query().subscribe((res: HttpResponse<IEmployeeNg[]>) => (this.employees = res.body || []));

      this.departmentService.query().subscribe((res: HttpResponse<IDepartmentNg[]>) => (this.departments = res.body || []));
    });
  }

  updateForm(employee: IEmployeeNg): void {
    this.editForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      hireDate: employee.hireDate ? employee.hireDate.format(DATE_TIME_FORMAT) : null,
      salary: employee.salary,
      commissionPct: employee.commissionPct,
      managerId: employee.managerId,
      departmentId: employee.departmentId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  private createFromForm(): IEmployeeNg {
    return {
      ...new EmployeeNg(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      hireDate: this.editForm.get(['hireDate'])!.value ? moment(this.editForm.get(['hireDate'])!.value, DATE_TIME_FORMAT) : undefined,
      salary: this.editForm.get(['salary'])!.value,
      commissionPct: this.editForm.get(['commissionPct'])!.value,
      managerId: this.editForm.get(['managerId'])!.value,
      departmentId: this.editForm.get(['departmentId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeNg>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
