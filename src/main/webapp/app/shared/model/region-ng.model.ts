export interface IRegionNg {
  id?: number;
  regionName?: string;
}

export class RegionNg implements IRegionNg {
  constructor(public id?: number, public regionName?: string) {}
}
