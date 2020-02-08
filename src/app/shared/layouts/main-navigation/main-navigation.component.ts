import {AfterViewInit, Component, EventEmitter, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements AfterViewInit {
  public isOpened: boolean;
  public hasToggleMiniSidenav: boolean;
  public toggleSideMenu: boolean;
  public toggleSideMenu$: EventEmitter<boolean>;

  @ViewChild('drawer') sideNav: MatSidenav;


  constructor() {
    this.isOpened = false;
    this.toggleSideMenu = false;
    this.toggleSideMenu$ = new EventEmitter(this.toggleSideMenu);
  }

  ngAfterViewInit(): void {
    this.sideNav.openedStart.subscribe(
      (() => this.isOpened = true)
    );

    this.sideNav.openedChange.subscribe(
      (res => this.isOpened = res)
    );

    this.toggleSideMenu$.subscribe(
      (res => this.toggleSideMenu = res)
    );
  }
}
