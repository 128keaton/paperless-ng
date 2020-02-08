import {Document} from './document.model';

export interface Documents {
  count: number;
  next: string;
  previous: string;
  results: Document[];
}
