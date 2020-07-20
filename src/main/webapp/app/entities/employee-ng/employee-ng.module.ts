import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { EmployeeNgComponent } from './employee-ng.component';
import { EmployeeNgDetailComponent } from './employee-ng-detail.component';
import { EmployeeNgUpdateComponent } from './employee-ng-update.component';
import { EmployeeNgDeleteDialogComponent } from './employee-ng-delete-dialog.component';
import { employeeRoute } from './employee-ng.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(employeeRoute)],
  declarations: [EmployeeNgComponent, EmployeeNgDetailComponent, EmployeeNgUpdateComponent, EmployeeNgDeleteDialogComponent],
  entryComponents: [EmployeeNgDeleteDialogComponent],
})
export class JhipsterSampleApplicationEmployeeNgModule {}
