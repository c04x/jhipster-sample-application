import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobHistoryNg } from 'app/shared/model/job-history-ng.model';
import { JobHistoryNgService } from './job-history-ng.service';

@Component({
  templateUrl: './job-history-ng-delete-dialog.component.html',
})
export class JobHistoryNgDeleteDialogComponent {
  jobHistory?: IJobHistoryNg;

  constructor(
    protected jobHistoryService: JobHistoryNgService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jobHistoryListModification');
      this.activeModal.close();
    });
  }
}
