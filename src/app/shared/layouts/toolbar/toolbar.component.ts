import {Component, EventEmitter, Input} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {PageTitleService} from '../../services/page-title.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {API_CONFIGURATION} from '../../../config/api.config';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent  {
  @Input() toggleMenu$: EventEmitter<boolean> | boolean;
  @Input() sidenav: MatSidenav;

  title: Observable<string>;
  username: string;
  host: string;

  constructor(private pageTitleService: PageTitleService) {
    this.title = pageTitleService.$pageTitle;
    this.username = API_CONFIGURATION.username;
    this.host = API_CONFIGURATION.url.replace('http://', '').replace('https://', '');
  }
}
