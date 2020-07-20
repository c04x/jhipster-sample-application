import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JobNgUpdateComponent } from 'app/entities/job-ng/job-ng-update.component';
import { JobNgService } from 'app/entities/job-ng/job-ng.service';
import { JobNg } from 'app/shared/model/job-ng.model';

describe('Component Tests', () => {
  describe('JobNg Management Update Component', () => {
    let comp: JobNgUpdateComponent;
    let fixture: ComponentFixture<JobNgUpdateComponent>;
    let service: JobNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [JobNgUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(JobNgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobNgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobNgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new JobNg(123);
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
        const entity = new JobNg();
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
