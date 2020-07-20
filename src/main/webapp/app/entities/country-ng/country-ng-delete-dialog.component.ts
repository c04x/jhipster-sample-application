import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountryNg } from 'app/shared/model/country-ng.model';
import { CountryNgService } from './country-ng.service';

@Component({
  templateUrl: './country-ng-delete-dialog.component.html',
})
export class CountryNgDeleteDialogComponent {
  country?: ICountryNg;

  constructor(protected countryService: CountryNgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.countryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('countryListModification');
      this.activeModal.close();
    });
  }
}
