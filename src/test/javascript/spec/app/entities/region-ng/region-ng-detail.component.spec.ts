import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RegionNgDetailComponent } from 'app/entities/region-ng/region-ng-detail.component';
import { RegionNg } from 'app/shared/model/region-ng.model';

describe('Component Tests', () => {
  describe('RegionNg Management Detail Component', () => {
    let comp: RegionNgDetailComponent;
    let fixture: ComponentFixture<RegionNgDetailComponent>;
    const route = ({ data: of({ region: new RegionNg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [RegionNgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RegionNgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegionNgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load region on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.region).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
