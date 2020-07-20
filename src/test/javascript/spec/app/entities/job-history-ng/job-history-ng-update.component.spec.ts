import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JobHistoryNgUpdateComponent } from 'app/entities/job-history-ng/job-history-ng-update.component';
import { JobHistoryNgService } from 'app/entities/job-history-ng/job-history-ng.service';
import { JobHistoryNg } from 'app/shared/model/job-history-ng.model';

describe('Component Tests', () => {
  describe('JobHistoryNg Management Update Component', () => {
    let comp: JobHistoryNgUpdateComponent;
    let fixture: ComponentFixture<JobHistoryNgUpdateComponent>;
    let service: JobHistoryNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [JobHistoryNgUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(JobHistoryNgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobHistoryNgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobHistoryNgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new JobHistoryNg(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new JobHistoryNg();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
