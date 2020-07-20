import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JobNgDetailComponent } from 'app/entities/job-ng/job-ng-detail.component';
import { JobNg } from 'app/shared/model/job-ng.model';

describe('Component Tests', () => {
  describe('JobNg Management Detail Component', () => {
    let comp: JobNgDetailComponent;
    let fixture: ComponentFixture<JobNgDetailComponent>;
    const route = ({ data: of({ job: new JobNg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [JobNgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(JobNgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobNgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load job on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.job).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
