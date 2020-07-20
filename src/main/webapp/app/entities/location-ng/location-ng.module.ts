import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { LocationNgComponent } from './location-ng.component';
import { LocationNgDetailComponent } from './location-ng-detail.component';
import { LocationNgUpdateComponent } from './location-ng-update.component';
import { LocationNgDeleteDialogComponent } from './location-ng-delete-dialog.component';
import { locationRoute } from './location-ng.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(locationRoute)],
  declarations: [LocationNgComponent, LocationNgDetailComponent, LocationNgUpdateComponent, LocationNgDeleteDialogComponent],
  entryComponents: [LocationNgDeleteDialogComponent],
})
export class JhipsterSampleApplicationLocationNgModule {}
