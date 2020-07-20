import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmployeeNg, EmployeeNg } from 'app/shared/model/employee-ng.model';
import { EmployeeNgService } from './employee-ng.service';
import { EmployeeNgComponent } from './employee-ng.component';
import { EmployeeNgDetailComponent } from './employee-ng-detail.component';
import { EmployeeNgUpdateComponent } from './employee-ng-update.component';

@Injectable({ providedIn: 'root' })
export class EmployeeNgResolve implements Resolve<IEmployeeNg> {
  constructor(private service: EmployeeNgService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeNg> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((employee: HttpResponse<EmployeeNg>) => {
          if (employee.body) {
            return of(employee.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmployeeNg());
  }
}

export const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeNgComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployeeNgDetailComponent,
    resolve: {
      employee: EmployeeNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeNgUpdateComponent,
    resolve: {
      employee: EmployeeNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployeeNgUpdateComponent,
    resolve: {
      employee: EmployeeNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.employee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
