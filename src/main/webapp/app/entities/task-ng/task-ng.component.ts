import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskNg } from 'app/shared/model/task-ng.model';
import { TaskNgService } from './task-ng.service';
import { TaskNgDeleteDialogComponent } from './task-ng-delete-dialog.component';

@Component({
  selector: 'jhi-task-ng',
  templateUrl: './task-ng.component.html',
})
export class TaskNgComponent implements OnInit, OnDestroy {
  tasks?: ITaskNg[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected taskService: TaskNgService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.taskService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ITaskNg[]>) => (this.tasks = res.body || []));
      return;
    }

    this.taskService.query().subscribe((res: HttpResponse<ITaskNg[]>) => (this.tasks = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTasks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITaskNg): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTasks(): void {
    this.eventSubscriber = this.eventManager.subscribe('taskListModification', () => this.loadAll());
  }

  delete(task: ITaskNg): void {
    const modalRef = this.modalService.open(TaskNgDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.task = task;
  }
}
