import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { CountryNgComponent } from './country-ng.component';
import { CountryNgDetailComponent } from './country-ng-detail.component';
import { CountryNgUpdateComponent } from './country-ng-update.component';
import { CountryNgDeleteDialogComponent } from './country-ng-delete-dialog.component';
import { countryRoute } from './country-ng.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(countryRoute)],
  declarations: [CountryNgComponent, CountryNgDetailComponent, CountryNgUpdateComponent, CountryNgDeleteDialogComponent],
  entryComponents: [CountryNgDeleteDialogComponent],
})
export class JhipsterSampleApplicationCountryNgModule {}
