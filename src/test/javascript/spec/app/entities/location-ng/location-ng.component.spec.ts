import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { LocationNgComponent } from 'app/entities/location-ng/location-ng.component';
import { LocationNgService } from 'app/entities/location-ng/location-ng.service';
import { LocationNg } from 'app/shared/model/location-ng.model';

describe('Component Tests', () => {
  describe('LocationNg Management Component', () => {
    let comp: LocationNgComponent;
    let fixture: ComponentFixture<LocationNgComponent>;
    let service: LocationNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [LocationNgComponent],
      })
        .overrideTemplate(LocationNgComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocationNgComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocationNgService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocationNg(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.locations && comp.locations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
