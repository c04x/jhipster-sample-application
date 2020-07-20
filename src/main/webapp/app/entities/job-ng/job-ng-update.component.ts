import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IJobNg, JobNg } from 'app/shared/model/job-ng.model';
import { JobNgService } from './job-ng.service';
import { ITaskNg } from 'app/shared/model/task-ng.model';
import { TaskNgService } from 'app/entities/task-ng/task-ng.service';
import { IEmployeeNg } from 'app/shared/model/employee-ng.model';
import { EmployeeNgService } from 'app/entities/employee-ng/employee-ng.service';

type SelectableEntity = ITaskNg | IEmployeeNg;

@Component({
  selector: 'jhi-job-ng-update',
  templateUrl: './job-ng-update.component.html',
})
export class JobNgUpdateComponent implements OnInit {
  isSaving = false;
  tasks: ITaskNg[] = [];
  employees: IEmployeeNg[] = [];

  editForm = this.fb.group({
    id: [],
    jobTitle: [],
    minSalary: [],
    maxSalary: [],
    tasks: [],
    employeeId: [],
  });

  constructor(
    protected jobService: JobNgService,
    protected taskService: TaskNgService,
    protected employeeService: EmployeeNgService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.updateForm(job);

      this.taskService.query().subscribe((res: HttpResponse<ITaskNg[]>) => (this.tasks = res.body || []));

      this.employeeService.query().subscribe((res: HttpResponse<IEmployeeNg[]>) => (this.employees = res.body || []));
    });
  }

  updateForm(job: IJobNg): void {
    this.editForm.patchValue({
      id: job.id,
      jobTitle: job.jobTitle,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      tasks: job.tasks,
      employeeId: job.employeeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const job = this.createFromForm();
    if (job.id !== undefined) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  private createFromForm(): IJobNg {
    return {
      ...new JobNg(),
      id: this.editForm.get(['id'])!.value,
      jobTitle: this.editForm.get(['jobTitle'])!.value,
      minSalary: this.editForm.get(['minSalary'])!.value,
      maxSalary: this.editForm.get(['maxSalary'])!.value,
      tasks: this.editForm.get(['tasks'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobNg>>): void {
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

  getSelected(selectedVals: ITaskNg[], option: ITaskNg): ITaskNg {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
