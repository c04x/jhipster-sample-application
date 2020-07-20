import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocationNg } from 'app/shared/model/location-ng.model';
import { LocationNgService } from './location-ng.service';

@Component({
  templateUrl: './location-ng-delete-dialog.component.html',
})
export class LocationNgDeleteDialogComponent {
  location?: ILocationNg;

  constructor(protected locationService: LocationNgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.locationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('locationListModification');
      this.activeModal.close();
    });
  }
}
