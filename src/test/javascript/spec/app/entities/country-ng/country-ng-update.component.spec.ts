import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CountryNgUpdateComponent } from 'app/entities/country-ng/country-ng-update.component';
import { CountryNgService } from 'app/entities/country-ng/country-ng.service';
import { CountryNg } from 'app/shared/model/country-ng.model';

describe('Component Tests', () => {
  describe('CountryNg Management Update Component', () => {
    let comp: CountryNgUpdateComponent;
    let fixture: ComponentFixture<CountryNgUpdateComponent>;
    let service: CountryNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [CountryNgUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CountryNgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountryNgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountryNgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CountryNg(123);
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
        const entity = new CountryNg();
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
