import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DepartmentNgDetailComponent } from 'app/entities/department-ng/department-ng-detail.component';
import { DepartmentNg } from 'app/shared/model/department-ng.model';

describe('Component Tests', () => {
  describe('DepartmentNg Management Detail Component', () => {
    let comp: DepartmentNgDetailComponent;
    let fixture: ComponentFixture<DepartmentNgDetailComponent>;
    const route = ({ data: of({ department: new DepartmentNg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DepartmentNgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DepartmentNgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartmentNgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load department on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.department).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
