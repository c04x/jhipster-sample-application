import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { LocationNgDetailComponent } from 'app/entities/location-ng/location-ng-detail.component';
import { LocationNg } from 'app/shared/model/location-ng.model';

describe('Component Tests', () => {
  describe('LocationNg Management Detail Component', () => {
    let comp: LocationNgDetailComponent;
    let fixture: ComponentFixture<LocationNgDetailComponent>;
    const route = ({ data: of({ location: new LocationNg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [LocationNgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocationNgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocationNgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load location on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.location).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
