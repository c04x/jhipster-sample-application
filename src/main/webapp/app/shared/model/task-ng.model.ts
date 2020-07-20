import { IJobNg } from 'app/shared/model/job-ng.model';

export interface ITaskNg {
  id?: number;
  title?: string;
  description?: string;
  jobs?: IJobNg[];
}

export class TaskNg implements ITaskNg {
  constructor(public id?: number, public title?: string, public description?: string, public jobs?: IJobNg[]) {}
}
