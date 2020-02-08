import { Injectable } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
   $pageTitle: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private titleService: Title) {
    this.$pageTitle.subscribe(title => this.titleService.setTitle(`Paperless NG - ${title}`));
  }

  set pageTitle(newValue: string) {
    this.$pageTitle.next(newValue);
  }

  get pageTitle(): string {
    return this.$pageTitle.value;
  }
}
