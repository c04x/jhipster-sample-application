import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { LocationNgUpdateComponent } from 'app/entities/location-ng/location-ng-update.component';
import { LocationNgService } from 'app/entities/location-ng/location-ng.service';
import { LocationNg } from 'app/shared/model/location-ng.model';

describe('Component Tests', () => {
  describe('LocationNg Management Update Component', () => {
    let comp: LocationNgUpdateComponent;
    let fixture: ComponentFixture<LocationNgUpdateComponent>;
    let service: LocationNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [LocationNgUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocationNgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocationNgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocationNgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocationNg(123);
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
        const entity = new LocationNg();
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
