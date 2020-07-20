import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { TaskNgComponent } from './task-ng.component';
import { TaskNgDetailComponent } from './task-ng-detail.component';
import { TaskNgUpdateComponent } from './task-ng-update.component';
import { TaskNgDeleteDialogComponent } from './task-ng-delete-dialog.component';
import { taskRoute } from './task-ng.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(taskRoute)],
  declarations: [TaskNgComponent, TaskNgDetailComponent, TaskNgUpdateComponent, TaskNgDeleteDialogComponent],
  entryComponents: [TaskNgDeleteDialogComponent],
})
export class JhipsterSampleApplicationTaskNgModule {}
