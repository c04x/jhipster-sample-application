import { ITaskNg } from 'app/shared/model/task-ng.model';

export interface IJobNg {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  tasks?: ITaskNg[];
  employeeId?: number;
}

export class JobNg implements IJobNg {
  constructor(
    public id?: number,
    public jobTitle?: string,
    public minSalary?: number,
    public maxSalary?: number,
    public tasks?: ITaskNg[],
    public employeeId?: number
  ) {}
}
