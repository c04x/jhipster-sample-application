import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IJobNg, JobNg } from 'app/shared/model/job-ng.model';
import { JobNgService } from './job-ng.service';
import { JobNgComponent } from './job-ng.component';
import { JobNgDetailComponent } from './job-ng-detail.component';
import { JobNgUpdateComponent } from './job-ng-update.component';

@Injectable({ providedIn: 'root' })
export class JobNgResolve implements Resolve<IJobNg> {
  constructor(private service: JobNgService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobNg> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((job: HttpResponse<JobNg>) => {
          if (job.body) {
            return of(job.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new JobNg());
  }
}

export const jobRoute: Routes = [
  {
    path: '',
    component: JobNgComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'jhipsterSampleApplicationApp.job.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobNgDetailComponent,
    resolve: {
      job: JobNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.job.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobNgUpdateComponent,
    resolve: {
      job: JobNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.job.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobNgUpdateComponent,
    resolve: {
      job: JobNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.job.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
