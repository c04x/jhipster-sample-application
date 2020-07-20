import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICountryNg } from 'app/shared/model/country-ng.model';
import { CountryNgService } from './country-ng.service';
import { CountryNgDeleteDialogComponent } from './country-ng-delete-dialog.component';

@Component({
  selector: 'jhi-country-ng',
  templateUrl: './country-ng.component.html',
})
export class CountryNgComponent implements OnInit, OnDestroy {
  countries?: ICountryNg[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected countryService: CountryNgService,
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
      this.countryService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ICountryNg[]>) => (this.countries = res.body || []));
      return;
    }

    this.countryService.query().subscribe((res: HttpResponse<ICountryNg[]>) => (this.countries = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCountries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICountryNg): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCountries(): void {
    this.eventSubscriber = this.eventManager.subscribe('countryListModification', () => this.loadAll());
  }

  delete(country: ICountryNg): void {
    const modalRef = this.modalService.open(CountryNgDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.country = country;
  }
}
