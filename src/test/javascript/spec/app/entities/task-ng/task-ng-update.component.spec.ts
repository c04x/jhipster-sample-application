import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TaskNgUpdateComponent } from 'app/entities/task-ng/task-ng-update.component';
import { TaskNgService } from 'app/entities/task-ng/task-ng.service';
import { TaskNg } from 'app/shared/model/task-ng.model';

describe('Component Tests', () => {
  describe('TaskNg Management Update Component', () => {
    let comp: TaskNgUpdateComponent;
    let fixture: ComponentFixture<TaskNgUpdateComponent>;
    let service: TaskNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TaskNgUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TaskNgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskNgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaskNgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TaskNg(123);
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
        const entity = new TaskNg();
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
