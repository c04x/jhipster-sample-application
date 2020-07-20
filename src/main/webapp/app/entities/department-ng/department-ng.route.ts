import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepartmentNg, DepartmentNg } from 'app/shared/model/department-ng.model';
import { DepartmentNgService } from './department-ng.service';
import { DepartmentNgComponent } from './department-ng.component';
import { DepartmentNgDetailComponent } from './department-ng-detail.component';
import { DepartmentNgUpdateComponent } from './department-ng-update.component';

@Injectable({ providedIn: 'root' })
export class DepartmentNgResolve implements Resolve<IDepartmentNg> {
  constructor(private service: DepartmentNgService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartmentNg> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((department: HttpResponse<DepartmentNg>) => {
          if (department.body) {
            return of(department.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DepartmentNg());
  }
}

export const departmentRoute: Routes = [
  {
    path: '',
    component: DepartmentNgComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DepartmentNgDetailComponent,
    resolve: {
      department: DepartmentNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DepartmentNgUpdateComponent,
    resolve: {
      department: DepartmentNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DepartmentNgUpdateComponent,
    resolve: {
      department: DepartmentNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.department.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
