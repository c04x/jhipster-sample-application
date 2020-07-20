import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CountryNgDetailComponent } from 'app/entities/country-ng/country-ng-detail.component';
import { CountryNg } from 'app/shared/model/country-ng.model';

describe('Component Tests', () => {
  describe('CountryNg Management Detail Component', () => {
    let comp: CountryNgDetailComponent;
    let fixture: ComponentFixture<CountryNgDetailComponent>;
    const route = ({ data: of({ country: new CountryNg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [CountryNgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CountryNgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountryNgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load country on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.country).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
