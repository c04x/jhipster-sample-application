import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobNg } from 'app/shared/model/job-ng.model';
import { JobNgService } from './job-ng.service';

@Component({
  templateUrl: './job-ng-delete-dialog.component.html',
})
export class JobNgDeleteDialogComponent {
  job?: IJobNg;

  constructor(protected jobService: JobNgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jobListModification');
      this.activeModal.close();
    });
  }
}
