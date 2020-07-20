import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITaskNg, TaskNg } from 'app/shared/model/task-ng.model';
import { TaskNgService } from './task-ng.service';
import { TaskNgComponent } from './task-ng.component';
import { TaskNgDetailComponent } from './task-ng-detail.component';
import { TaskNgUpdateComponent } from './task-ng-update.component';

@Injectable({ providedIn: 'root' })
export class TaskNgResolve implements Resolve<ITaskNg> {
  constructor(private service: TaskNgService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaskNg> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((task: HttpResponse<TaskNg>) => {
          if (task.body) {
            return of(task.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TaskNg());
  }
}

export const taskRoute: Routes = [
  {
    path: '',
    component: TaskNgComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.task.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaskNgDetailComponent,
    resolve: {
      task: TaskNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.task.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaskNgUpdateComponent,
    resolve: {
      task: TaskNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.task.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaskNgUpdateComponent,
    resolve: {
      task: TaskNgResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.task.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
