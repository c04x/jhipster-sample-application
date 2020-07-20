import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region-ng',
        loadChildren: () => import('./region-ng/region-ng.module').then(m => m.JhipsterSampleApplicationRegionNgModule),
      },
      {
        path: 'country-ng',
        loadChildren: () => import('./country-ng/country-ng.module').then(m => m.JhipsterSampleApplicationCountryNgModule),
      },
      {
        path: 'location-ng',
        loadChildren: () => import('./location-ng/location-ng.module').then(m => m.JhipsterSampleApplicationLocationNgModule),
      },
      {
        path: 'department-ng',
        loadChildren: () => import('./department-ng/department-ng.module').then(m => m.JhipsterSampleApplicationDepartmentNgModule),
      },
      {
        path: 'task-ng',
        loadChildren: () => import('./task-ng/task-ng.module').then(m => m.JhipsterSampleApplicationTaskNgModule),
      },
      {
        path: 'employee-ng',
        loadChildren: () => import('./employee-ng/employee-ng.module').then(m => m.JhipsterSampleApplicationEmployeeNgModule),
      },
      {
        path: 'job-ng',
        loadChildren: () => import('./job-ng/job-ng.module').then(m => m.JhipsterSampleApplicationJobNgModule),
      },
      {
        path: 'job-history-ng',
        loadChildren: () => import('./job-history-ng/job-history-ng.module').then(m => m.JhipsterSampleApplicationJobHistoryNgModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipsterSampleApplicationEntityModule {}
