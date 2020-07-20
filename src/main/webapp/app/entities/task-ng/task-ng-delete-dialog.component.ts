import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskNg } from 'app/shared/model/task-ng.model';
import { TaskNgService } from './task-ng.service';

@Component({
  templateUrl: './task-ng-delete-dialog.component.html',
})
export class TaskNgDeleteDialogComponent {
  task?: ITaskNg;

  constructor(protected taskService: TaskNgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskService.delete(id).subscribe(() => {
      this.eventManager.broadcast('taskListModification');
      this.activeModal.close();
    });
  }
}
