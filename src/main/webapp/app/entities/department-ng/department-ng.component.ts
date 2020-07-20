import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentNg } from 'app/shared/model/department-ng.model';
import { DepartmentNgService } from './department-ng.service';
import { DepartmentNgDeleteDialogComponent } from './department-ng-delete-dialog.component';

@Component({
  selector: 'jhi-department-ng',
  templateUrl: './department-ng.component.html',
})
export class DepartmentNgComponent implements OnInit, OnDestroy {
  departments?: IDepartmentNg[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected departmentService: DepartmentNgService,
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
      this.departmentService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IDepartmentNg[]>) => (this.departments = res.body || []));
      return;
    }

    this.departmentService.query().subscribe((res: HttpResponse<IDepartmentNg[]>) => (this.departments = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartmentNg): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartments(): void {
    this.eventSubscriber = this.eventManager.subscribe('departmentListModification', () => this.loadAll());
  }

  delete(department: IDepartmentNg): void {
    const modalRef = this.modalService.open(DepartmentNgDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.department = department;
  }
}
