import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TaskNgDetailComponent } from 'app/entities/task-ng/task-ng-detail.component';
import { TaskNg } from 'app/shared/model/task-ng.model';

describe('Component Tests', () => {
  describe('TaskNg Management Detail Component', () => {
    let comp: TaskNgDetailComponent;
    let fixture: ComponentFixture<TaskNgDetailComponent>;
    const route = ({ data: of({ task: new TaskNg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TaskNgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TaskNgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaskNgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load task on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.task).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
