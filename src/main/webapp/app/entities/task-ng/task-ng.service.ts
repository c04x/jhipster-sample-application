import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ITaskNg } from 'app/shared/model/task-ng.model';

type EntityResponseType = HttpResponse<ITaskNg>;
type EntityArrayResponseType = HttpResponse<ITaskNg[]>;

@Injectable({ providedIn: 'root' })
export class TaskNgService {
  public resourceUrl = SERVER_API_URL + 'api/tasks';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/tasks';

  constructor(protected http: HttpClient) {}

  create(task: ITaskNg): Observable<EntityResponseType> {
    return this.http.post<ITaskNg>(this.resourceUrl, task, { observe: 'response' });
  }

  update(task: ITaskNg): Observable<EntityResponseType> {
    return this.http.put<ITaskNg>(this.resourceUrl, task, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskNg>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskNg[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskNg[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
