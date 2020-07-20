import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IDepartmentNg } from 'app/shared/model/department-ng.model';

type EntityResponseType = HttpResponse<IDepartmentNg>;
type EntityArrayResponseType = HttpResponse<IDepartmentNg[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentNgService {
  public resourceUrl = SERVER_API_URL + 'api/departments';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/departments';

  constructor(protected http: HttpClient) {}

  create(department: IDepartmentNg): Observable<EntityResponseType> {
    return this.http.post<IDepartmentNg>(this.resourceUrl, department, { observe: 'response' });
  }

  update(department: IDepartmentNg): Observable<EntityResponseType> {
    return this.http.put<IDepartmentNg>(this.resourceUrl, department, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepartmentNg>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentNg[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentNg[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
