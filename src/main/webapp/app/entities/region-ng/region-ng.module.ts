import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { RegionNgComponent } from './region-ng.component';
import { RegionNgDetailComponent } from './region-ng-detail.component';
import { RegionNgUpdateComponent } from './region-ng-update.component';
import { RegionNgDeleteDialogComponent } from './region-ng-delete-dialog.component';
import { regionRoute } from './region-ng.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(regionRoute)],
  declarations: [RegionNgComponent, RegionNgDetailComponent, RegionNgUpdateComponent, RegionNgDeleteDialogComponent],
  entryComponents: [RegionNgDeleteDialogComponent],
})
export class JhipsterSampleApplicationRegionNgModule {}
