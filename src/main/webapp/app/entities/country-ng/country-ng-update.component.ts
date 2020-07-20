import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICountryNg, CountryNg } from 'app/shared/model/country-ng.model';
import { CountryNgService } from './country-ng.service';
import { IRegionNg } from 'app/shared/model/region-ng.model';
import { RegionNgService } from 'app/entities/region-ng/region-ng.service';

@Component({
  selector: 'jhi-country-ng-update',
  templateUrl: './country-ng-update.component.html',
})
export class CountryNgUpdateComponent implements OnInit {
  isSaving = false;
  regions: IRegionNg[] = [];

  editForm = this.fb.group({
    id: [],
    countryName: [],
    regionId: [],
  });

  constructor(
    protected countryService: CountryNgService,
    protected regionService: RegionNgService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);

      this.regionService
        .query({ filter: 'country-is-null' })
        .pipe(
          map((res: HttpResponse<IRegionNg[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRegionNg[]) => {
          if (!country.regionId) {
            this.regions = resBody;
          } else {
            this.regionService
              .find(country.regionId)
              .pipe(
                map((subRes: HttpResponse<IRegionNg>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRegionNg[]) => (this.regions = concatRes));
          }
        });
    });
  }

  updateForm(country: ICountryNg): void {
    this.editForm.patchValue({
      id: country.id,
      countryName: country.countryName,
      regionId: country.regionId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  private createFromForm(): ICountryNg {
    return {
      ...new CountryNg(),
      id: this.editForm.get(['id'])!.value,
      countryName: this.editForm.get(['countryName'])!.value,
      regionId: this.editForm.get(['regionId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountryNg>>): void {
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

  trackById(index: number, item: IRegionNg): any {
    return item.id;
  }
}
