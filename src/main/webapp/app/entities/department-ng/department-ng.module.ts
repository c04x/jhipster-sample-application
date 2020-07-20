import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { DepartmentNgComponent } from './department-ng.component';
import { DepartmentNgDetailComponent } from './department-ng-detail.component';
import { DepartmentNgUpdateComponent } from './department-ng-update.component';
import { DepartmentNgDeleteDialogComponent } from './department-ng-delete-dialog.component';
import { departmentRoute } from './department-ng.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(departmentRoute)],
  declarations: [DepartmentNgComponent, DepartmentNgDetailComponent, DepartmentNgUpdateComponent, DepartmentNgDeleteDialogComponent],
  entryComponents: [DepartmentNgDeleteDialogComponent],
})
export class JhipsterSampleApplicationDepartmentNgModule {}
