import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeNg } from 'app/shared/model/employee-ng.model';
import { EmployeeNgService } from './employee-ng.service';

@Component({
  templateUrl: './employee-ng-delete-dialog.component.html',
})
export class EmployeeNgDeleteDialogComponent {
  employee?: IEmployeeNg;

  constructor(protected employeeService: EmployeeNgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('employeeListModification');
      this.activeModal.close();
    });
  }
}
