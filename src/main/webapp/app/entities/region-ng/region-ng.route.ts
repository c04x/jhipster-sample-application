import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRegionNg, RegionNg } from 'app/shared/model/region-ng.model';
import { RegionNgService } from './region-ng.service';
import { RegionNgComponent } from './region-ng.component';
import { RegionNgDetailComponent } from './region-ng-detail.component';
import { RegionNgUpdateComponent } from './region-ng-update.component';

@Injectable({ providedIn: 'root' })
export class RegionNgResolve implements Resolve<IRegionNg> {
  constructor(private service: RegionNgService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegionNg> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((region: HttpResponse<RegionNg>) => {
          if (region.body) {
            return of(region.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegionNg());
  }
}

export const regionRoute: Routes = [
  {
    path: '',
    component: RegionNgComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.region.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegionNgDetailComponent,
    resolve: {
      region: RegionNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.region.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegionNgUpdateComponent,
    resolve: {
      region: RegionNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.region.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegionNgUpdateComponent,
    resolve: {
      region: RegionNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.region.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
