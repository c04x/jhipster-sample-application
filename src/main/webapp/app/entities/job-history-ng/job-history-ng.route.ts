import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IJobHistoryNg, JobHistoryNg } from 'app/shared/model/job-history-ng.model';
import { JobHistoryNgService } from './job-history-ng.service';
import { JobHistoryNgComponent } from './job-history-ng.component';
import { JobHistoryNgDetailComponent } from './job-history-ng-detail.component';
import { JobHistoryNgUpdateComponent } from './job-history-ng-update.component';

@Injectable({ providedIn: 'root' })
export class JobHistoryNgResolve implements Resolve<IJobHistoryNg> {
  constructor(private service: JobHistoryNgService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobHistoryNg> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((jobHistory: HttpResponse<JobHistoryNg>) => {
          if (jobHistory.body) {
            return of(jobHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new JobHistoryNg());
  }
}

export const jobHistoryRoute: Routes = [
  {
    path: '',
    component: JobHistoryNgComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.jobHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobHistoryNgDetailComponent,
    resolve: {
      jobHistory: JobHistoryNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.jobHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobHistoryNgUpdateComponent,
    resolve: {
      jobHistory: JobHistoryNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.jobHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobHistoryNgUpdateComponent,
    resolve: {
      jobHistory: JobHistoryNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.jobHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
