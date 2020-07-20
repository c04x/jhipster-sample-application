import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IRegionNg } from 'app/shared/model/region-ng.model';

type EntityResponseType = HttpResponse<IRegionNg>;
type EntityArrayResponseType = HttpResponse<IRegionNg[]>;

@Injectable({ providedIn: 'root' })
export class RegionNgService {
  public resourceUrl = SERVER_API_URL + 'api/regions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/regions';

  constructor(protected http: HttpClient) {}

  create(region: IRegionNg): Observable<EntityResponseType> {
    return this.http.post<IRegionNg>(this.resourceUrl, region, { observe: 'response' });
  }

  update(region: IRegionNg): Observable<EntityResponseType> {
    return this.http.put<IRegionNg>(this.resourceUrl, region, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegionNg>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegionNg[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegionNg[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
