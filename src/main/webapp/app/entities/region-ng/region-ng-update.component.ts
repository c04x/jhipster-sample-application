import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRegionNg, RegionNg } from 'app/shared/model/region-ng.model';
import { RegionNgService } from './region-ng.service';

@Component({
  selector: 'jhi-region-ng-update',
  templateUrl: './region-ng-update.component.html',
})
export class RegionNgUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    regionName: [],
  });

  constructor(protected regionService: RegionNgService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => {
      this.updateForm(region);
    });
  }

  updateForm(region: IRegionNg): void {
    this.editForm.patchValue({
      id: region.id,
      regionName: region.regionName,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const region = this.createFromForm();
    if (region.id !== undefined) {
      this.subscribeToSaveResponse(this.regionService.update(region));
    } else {
      this.subscribeToSaveResponse(this.regionService.create(region));
    }
  }

  private createFromForm(): IRegionNg {
    return {
      ...new RegionNg(),
      id: this.editForm.get(['id'])!.value,
      regionName: this.editForm.get(['regionName'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegionNg>>): void {
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
}
