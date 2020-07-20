import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocationNg } from 'app/shared/model/location-ng.model';
import { LocationNgService } from './location-ng.service';
import { LocationNgDeleteDialogComponent } from './location-ng-delete-dialog.component';

@Component({
  selector: 'jhi-location-ng',
  templateUrl: './location-ng.component.html',
})
export class LocationNgComponent implements OnInit, OnDestroy {
  locations?: ILocationNg[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected locationService: LocationNgService,
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
      this.locationService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ILocationNg[]>) => (this.locations = res.body || []));
      return;
    }

    this.locationService.query().subscribe((res: HttpResponse<ILocationNg[]>) => (this.locations = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocationNg): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocations(): void {
    this.eventSubscriber = this.eventManager.subscribe('locationListModification', () => this.loadAll());
  }

  delete(location: ILocationNg): void {
    const modalRef = this.modalService.open(LocationNgDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.location = location;
  }
}
