import {Tag} from './tag.model';

export interface Tags {
  count: number;
  next: string;
  previous: string;
  results: Tag[];
}
