import { Moment } from 'moment';
import { IJobNg } from 'app/shared/model/job-ng.model';

export interface IEmployeeNg {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  salary?: number;
  commissionPct?: number;
  jobs?: IJobNg[];
  managerId?: number;
  departmentId?: number;
}

export class EmployeeNg implements IEmployeeNg {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public hireDate?: Moment,
    public salary?: number,
    public commissionPct?: number,
    public jobs?: IJobNg[],
    public managerId?: number,
    public departmentId?: number
  ) {}
}
