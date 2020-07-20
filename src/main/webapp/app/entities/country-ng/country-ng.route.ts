import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICountryNg, CountryNg } from 'app/shared/model/country-ng.model';
import { CountryNgService } from './country-ng.service';
import { CountryNgComponent } from './country-ng.component';
import { CountryNgDetailComponent } from './country-ng-detail.component';
import { CountryNgUpdateComponent } from './country-ng-update.component';

@Injectable({ providedIn: 'root' })
export class CountryNgResolve implements Resolve<ICountryNg> {
  constructor(private service: CountryNgService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountryNg> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((country: HttpResponse<CountryNg>) => {
          if (country.body) {
            return of(country.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CountryNg());
  }
}

export const countryRoute: Routes = [
  {
    path: '',
    component: CountryNgComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CountryNgDetailComponent,
    resolve: {
      country: CountryNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CountryNgUpdateComponent,
    resolve: {
      country: CountryNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CountryNgUpdateComponent,
    resolve: {
      country: CountryNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.country.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
