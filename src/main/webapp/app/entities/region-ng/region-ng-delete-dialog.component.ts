import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegionNg } from 'app/shared/model/region-ng.model';
import { RegionNgService } from './region-ng.service';

@Component({
  templateUrl: './region-ng-delete-dialog.component.html',
})
export class RegionNgDeleteDialogComponent {
  region?: IRegionNg;

  constructor(protected regionService: RegionNgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.regionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('regionListModification');
      this.activeModal.close();
    });
  }
}
