import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TaskNgComponent } from 'app/entities/task-ng/task-ng.component';
import { TaskNgService } from 'app/entities/task-ng/task-ng.service';
import { TaskNg } from 'app/shared/model/task-ng.model';

describe('Component Tests', () => {
  describe('TaskNg Management Component', () => {
    let comp: TaskNgComponent;
    let fixture: ComponentFixture<TaskNgComponent>;
    let service: TaskNgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TaskNgComponent],
      })
        .overrideTemplate(TaskNgComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskNgComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaskNgService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TaskNg(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tasks && comp.tasks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
