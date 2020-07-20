import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentNg } from 'app/shared/model/department-ng.model';
import { DepartmentNgService } from './department-ng.service';

@Component({
  templateUrl: './department-ng-delete-dialog.component.html',
})
export class DepartmentNgDeleteDialogComponent {
  department?: IDepartmentNg;

  constructor(
    protected departmentService: DepartmentNgService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.departmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('departmentListModification');
      this.activeModal.close();
    });
  }
}
