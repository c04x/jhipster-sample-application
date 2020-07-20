import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ILocationNg, LocationNg } from 'app/shared/model/location-ng.model';
import { LocationNgService } from './location-ng.service';
import { ICountryNg } from 'app/shared/model/country-ng.model';
import { CountryNgService } from 'app/entities/country-ng/country-ng.service';

@Component({
  selector: 'jhi-location-ng-update',
  templateUrl: './location-ng-update.component.html',
})
export class LocationNgUpdateComponent implements OnInit {
  isSaving = false;
  countries: ICountryNg[] = [];

  editForm = this.fb.group({
    id: [],
    streetAddress: [],
    postalCode: [],
    city: [],
    stateProvince: [],
    countryId: [],
  });

  constructor(
    protected locationService: LocationNgService,
    protected countryService: CountryNgService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);

      this.countryService
        .query({ filter: 'location-is-null' })
        .pipe(
          map((res: HttpResponse<ICountryNg[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICountryNg[]) => {
          if (!location.countryId) {
            this.countries = resBody;
          } else {
            this.countryService
              .find(location.countryId)
              .pipe(
                map((subRes: HttpResponse<ICountryNg>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICountryNg[]) => (this.countries = concatRes));
          }
        });
    });
  }

  updateForm(location: ILocationNg): void {
    this.editForm.patchValue({
      id: location.id,
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      city: location.city,
      stateProvince: location.stateProvince,
      countryId: location.countryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocationNg {
    return {
      ...new LocationNg(),
      id: this.editForm.get(['id'])!.value,
      streetAddress: this.editForm.get(['streetAddress'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      city: this.editForm.get(['city'])!.value,
      stateProvince: this.editForm.get(['stateProvince'])!.value,
      countryId: this.editForm.get(['countryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationNg>>): void {
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

  trackById(index: number, item: ICountryNg): any {
    return item.id;
  }
}
