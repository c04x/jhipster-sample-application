import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RegionNgUpdateComponent } from 'app/entities/region-ng/region-ng-update.component';
import { RegionNgService } from 'app/entities/region-ng/region-ng.service';
import { RegionNg } from 'app/shared/model/region-ng.model';

describe('Component Tests', () => {
  describe('RegionNg Management Update Component', () => {
    let comp: RegionNgUpdateComponent;
    let fixture: ComponentFixture<RegionNgUpdateComponent>;
    let service: RegionNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RegionNgUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RegionNgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionNgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegionNgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RegionNg(123);
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
        const entity = new RegionNg();
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
