import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RegionNgComponent } from 'app/entities/region-ng/region-ng.component';
import { RegionNgService } from 'app/entities/region-ng/region-ng.service';
import { RegionNg } from 'app/shared/model/region-ng.model';

describe('Component Tests', () => {
  describe('RegionNg Management Component', () => {
    let comp: RegionNgComponent;
    let fixture: ComponentFixture<RegionNgComponent>;
    let service: RegionNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RegionNgComponent],
      })
        .overrideTemplate(RegionNgComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionNgComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegionNgService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RegionNg(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.regions && comp.regions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
