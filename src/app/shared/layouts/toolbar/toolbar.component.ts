import {Component, EventEmitter, Input} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {PageTitleService} from '../../services/page-title.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent  {
  private toggleMenu: boolean;

  @Input() toggleMenu$: EventEmitter<boolean> | boolean;
  @Input() sidenav: MatSidenav;

  title: Observable<string>;

  constructor(private pageTitleService: PageTitleService) {
    this.title = pageTitleService.$pageTitle;
  }

  onToggleMenu(): void {
    this.toggleMenu = !this.toggleMenu;
    this.sidenav.toggle().then();

    if (this.toggleMenu$ instanceof EventEmitter) {
      this.toggleMenu$.emit(this.toggleMenu);
    }
  }
}
