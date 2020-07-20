export interface ICountryNg {
  id?: number;
  countryName?: string;
  regionId?: number;
}

export class CountryNg implements ICountryNg {
  constructor(public id?: number, public countryName?: string, public regionId?: number) {}
}
