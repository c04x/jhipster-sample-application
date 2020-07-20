import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDepartmentNg, DepartmentNg } from 'app/shared/model/department-ng.model';
import { DepartmentNgService } from './department-ng.service';
import { ILocationNg } from 'app/shared/model/location-ng.model';
import { LocationNgService } from 'app/entities/location-ng/location-ng.service';

@Component({
  selector: 'jhi-department-ng-update',
  templateUrl: './department-ng-update.component.html',
})
export class DepartmentNgUpdateComponent implements OnInit {
  isSaving = false;
  locations: ILocationNg[] = [];

  editForm = this.fb.group({
    id: [],
    departmentName: [null, [Validators.required]],
    locationId: [],
  });

  constructor(
    protected departmentService: DepartmentNgService,
    protected locationService: LocationNgService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);

      this.locationService
        .query({ filter: 'department-is-null' })
        .pipe(
          map((res: HttpResponse<ILocationNg[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ILocationNg[]) => {
          if (!department.locationId) {
            this.locations = resBody;
          } else {
            this.locationService
              .find(department.locationId)
              .pipe(
                map((subRes: HttpResponse<ILocationNg>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILocationNg[]) => (this.locations = concatRes));
          }
        });
    });
  }

  updateForm(department: IDepartmentNg): void {
    this.editForm.patchValue({
      id: department.id,
      departmentName: department.departmentName,
      locationId: department.locationId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  private createFromForm(): IDepartmentNg {
    return {
      ...new DepartmentNg(),
      id: this.editForm.get(['id'])!.value,
      departmentName: this.editForm.get(['departmentName'])!.value,
      locationId: this.editForm.get(['locationId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentNg>>): void {
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

  trackById(index: number, item: ILocationNg): any {
    return item.id;
  }
}
