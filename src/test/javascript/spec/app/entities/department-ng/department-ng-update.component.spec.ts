import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DepartmentNgUpdateComponent } from 'app/entities/department-ng/department-ng-update.component';
import { DepartmentNgService } from 'app/entities/department-ng/department-ng.service';
import { DepartmentNg } from 'app/shared/model/department-ng.model';

describe('Component Tests', () => {
  describe('DepartmentNg Management Update Component', () => {
    let comp: DepartmentNgUpdateComponent;
    let fixture: ComponentFixture<DepartmentNgUpdateComponent>;
    let service: DepartmentNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DepartmentNgUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DepartmentNgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentNgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentNgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DepartmentNg(123);
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
        const entity = new DepartmentNg();
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
