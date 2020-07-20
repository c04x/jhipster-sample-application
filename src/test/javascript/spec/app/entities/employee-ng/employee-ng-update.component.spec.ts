import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EmployeeNgUpdateComponent } from 'app/entities/employee-ng/employee-ng-update.component';
import { EmployeeNgService } from 'app/entities/employee-ng/employee-ng.service';
import { EmployeeNg } from 'app/shared/model/employee-ng.model';

describe('Component Tests', () => {
  describe('EmployeeNg Management Update Component', () => {
    let comp: EmployeeNgUpdateComponent;
    let fixture: ComponentFixture<EmployeeNgUpdateComponent>;
    let service: EmployeeNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [EmployeeNgUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EmployeeNgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeNgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeNgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeNg(123);
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
        const entity = new EmployeeNg();
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
