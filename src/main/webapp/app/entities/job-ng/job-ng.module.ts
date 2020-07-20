import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { JobNgComponent } from './job-ng.component';
import { JobNgDetailComponent } from './job-ng-detail.component';
import { JobNgUpdateComponent } from './job-ng-update.component';
import { JobNgDeleteDialogComponent } from './job-ng-delete-dialog.component';
import { jobRoute } from './job-ng.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(jobRoute)],
  declarations: [JobNgComponent, JobNgDetailComponent, JobNgUpdateComponent, JobNgDeleteDialogComponent],
  entryComponents: [JobNgDeleteDialogComponent],
})
export class JhipsterSampleApplicationJobNgModule {}
