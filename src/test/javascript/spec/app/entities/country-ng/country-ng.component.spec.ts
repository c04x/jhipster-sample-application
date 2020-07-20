import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CountryNgComponent } from 'app/entities/country-ng/country-ng.component';
import { CountryNgService } from 'app/entities/country-ng/country-ng.service';
import { CountryNg } from 'app/shared/model/country-ng.model';

describe('Component Tests', () => {
  describe('CountryNg Management Component', () => {
    let comp: CountryNgComponent;
    let fixture: ComponentFixture<CountryNgComponent>;
    let service: CountryNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [CountryNgComponent],
      })
        .overrideTemplate(CountryNgComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountryNgComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountryNgService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CountryNg(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.countries && comp.countries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
