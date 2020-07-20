import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JobHistoryNgDetailComponent } from 'app/entities/job-history-ng/job-history-ng-detail.component';
import { JobHistoryNg } from 'app/shared/model/job-history-ng.model';

describe('Component Tests', () => {
  describe('JobHistoryNg Management Detail Component', () => {
    let comp: JobHistoryNgDetailComponent;
    let fixture: ComponentFixture<JobHistoryNgDetailComponent>;
    const route = ({ data: of({ jobHistory: new JobHistoryNg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [JobHistoryNgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(JobHistoryNgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobHistoryNgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load jobHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.jobHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
