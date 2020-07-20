import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EmployeeNgDetailComponent } from 'app/entities/employee-ng/employee-ng-detail.component';
import { EmployeeNg } from 'app/shared/model/employee-ng.model';

describe('Component Tests', () => {
  describe('EmployeeNg Management Detail Component', () => {
    let comp: EmployeeNgDetailComponent;
    let fixture: ComponentFixture<EmployeeNgDetailComponent>;
    const route = ({ data: of({ employee: new EmployeeNg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [EmployeeNgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EmployeeNgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeNgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load employee on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employee).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
