import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ICountryNg } from 'app/shared/model/country-ng.model';

type EntityResponseType = HttpResponse<ICountryNg>;
type EntityArrayResponseType = HttpResponse<ICountryNg[]>;

@Injectable({ providedIn: 'root' })
export class CountryNgService {
  public resourceUrl = SERVER_API_URL + 'api/countries';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/countries';

  constructor(protected http: HttpClient) {}

  create(country: ICountryNg): Observable<EntityResponseType> {
    return this.http.post<ICountryNg>(this.resourceUrl, country, { observe: 'response' });
  }

  update(country: ICountryNg): Observable<EntityResponseType> {
    return this.http.put<ICountryNg>(this.resourceUrl, country, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICountryNg>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountryNg[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountryNg[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
