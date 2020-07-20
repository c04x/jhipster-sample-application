import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocationNg, LocationNg } from 'app/shared/model/location-ng.model';
import { LocationNgService } from './location-ng.service';
import { LocationNgComponent } from './location-ng.component';
import { LocationNgDetailComponent } from './location-ng-detail.component';
import { LocationNgUpdateComponent } from './location-ng-update.component';

@Injectable({ providedIn: 'root' })
export class LocationNgResolve implements Resolve<ILocationNg> {
  constructor(private service: LocationNgService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocationNg> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((location: HttpResponse<LocationNg>) => {
          if (location.body) {
            return of(location.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocationNg());
  }
}

export const locationRoute: Routes = [
  {
    path: '',
    component: LocationNgComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.location.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocationNgDetailComponent,
    resolve: {
      location: LocationNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.location.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocationNgUpdateComponent,
    resolve: {
      location: LocationNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.location.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocationNgUpdateComponent,
    resolve: {
      location: LocationNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.location.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
