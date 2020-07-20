import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IJobHistoryNg, JobHistoryNg } from 'app/shared/model/job-history-ng.model';
import { JobHistoryNgService } from './job-history-ng.service';
import { IJobNg } from 'app/shared/model/job-ng.model';
import { JobNgService } from 'app/entities/job-ng/job-ng.service';
import { IDepartmentNg } from 'app/shared/model/department-ng.model';
import { DepartmentNgService } from 'app/entities/department-ng/department-ng.service';
import { IEmployeeNg } from 'app/shared/model/employee-ng.model';
import { EmployeeNgService } from 'app/entities/employee-ng/employee-ng.service';

type SelectableEntity = IJobNg | IDepartmentNg | IEmployeeNg;

@Component({
  selector: 'jhi-job-history-ng-update',
  templateUrl: './job-history-ng-update.component.html',
})
export class JobHistoryNgUpdateComponent implements OnInit {
  isSaving = false;
  jobs: IJobNg[] = [];
  departments: IDepartmentNg[] = [];
  employees: IEmployeeNg[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    language: [],
    jobId: [],
    departmentId: [],
    employeeId: [],
  });

  constructor(
    protected jobHistoryService: JobHistoryNgService,
    protected jobService: JobNgService,
    protected departmentService: DepartmentNgService,
    protected employeeService: EmployeeNgService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      if (!jobHistory.id) {
        const today = moment().startOf('day');
        jobHistory.startDate = today;
        jobHistory.endDate = today;
      }

      this.updateForm(jobHistory);

      this.jobService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IJobNg[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IJobNg[]) => {
          if (!jobHistory.jobId) {
            this.jobs = resBody;
          } else {
            this.jobService
              .find(jobHistory.jobId)
              .pipe(
                map((subRes: HttpResponse<IJobNg>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IJobNg[]) => (this.jobs = concatRes));
          }
        });

      this.departmentService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IDepartmentNg[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDepartmentNg[]) => {
          if (!jobHistory.departmentId) {
            this.departments = resBody;
          } else {
            this.departmentService
              .find(jobHistory.departmentId)
              .pipe(
                map((subRes: HttpResponse<IDepartmentNg>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDepartmentNg[]) => (this.departments = concatRes));
          }
        });

      this.employeeService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IEmployeeNg[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEmployeeNg[]) => {
          if (!jobHistory.employeeId) {
            this.employees = resBody;
          } else {
            this.employeeService
              .find(jobHistory.employeeId)
              .pipe(
                map((subRes: HttpResponse<IEmployeeNg>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEmployeeNg[]) => (this.employees = concatRes));
          }
        });
    });
  }

  updateForm(jobHistory: IJobHistoryNg): void {
    this.editForm.patchValue({
      id: jobHistory.id,
      startDate: jobHistory.startDate ? jobHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: jobHistory.endDate ? jobHistory.endDate.format(DATE_TIME_FORMAT) : null,
      language: jobHistory.language,
      jobId: jobHistory.jobId,
      departmentId: jobHistory.departmentId,
      employeeId: jobHistory.employeeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobHistory = this.createFromForm();
    if (jobHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  private createFromForm(): IJobHistoryNg {
    return {
      ...new JobHistoryNg(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language'])!.value,
      jobId: this.editForm.get(['jobId'])!.value,
      departmentId: this.editForm.get(['departmentId'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryNg>>): void {
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
