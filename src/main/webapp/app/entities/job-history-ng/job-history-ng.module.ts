import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { JobHistoryNgComponent } from './job-history-ng.component';
import { JobHistoryNgDetailComponent } from './job-history-ng-detail.component';
import { JobHistoryNgUpdateComponent } from './job-history-ng-update.component';
import { JobHistoryNgDeleteDialogComponent } from './job-history-ng-delete-dialog.component';
import { jobHistoryRoute } from './job-history-ng.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(jobHistoryRoute)],
  declarations: [JobHistoryNgComponent, JobHistoryNgDetailComponent, JobHistoryNgUpdateComponent, JobHistoryNgDeleteDialogComponent],
  entryComponents: [JobHistoryNgDeleteDialogComponent],
})
export class JhipsterSampleApplicationJobHistoryNgModule {}
