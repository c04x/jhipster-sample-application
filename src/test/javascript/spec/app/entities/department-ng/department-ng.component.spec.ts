import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DepartmentNgComponent } from 'app/entities/department-ng/department-ng.component';
import { DepartmentNgService } from 'app/entities/department-ng/department-ng.service';
import { DepartmentNg } from 'app/shared/model/department-ng.model';

describe('Component Tests', () => {
  describe('DepartmentNg Management Component', () => {
    let comp: DepartmentNgComponent;
    let fixture: ComponentFixture<DepartmentNgComponent>;
    let service: DepartmentNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DepartmentNgComponent],
      })
        .overrideTemplate(DepartmentNgComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentNgComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentNgService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DepartmentNg(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.departments && comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
