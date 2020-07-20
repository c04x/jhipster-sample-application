import { IEmployeeNg } from 'app/shared/model/employee-ng.model';

export interface IDepartmentNg {
  id?: number;
  departmentName?: string;
  locationId?: number;
  employees?: IEmployeeNg[];
}

export class DepartmentNg implements IDepartmentNg {
  constructor(public id?: number, public departmentName?: string, public locationId?: number, public employees?: IEmployeeNg[]) {}
}
