import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MENU_ROUTES, MenuRoute} from '../../../../config/menu.config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public active: string;
  public menuItems: MenuRoute[];

  public currentIndex: number;

  constructor(private router: Router) {
    this.menuItems = MENU_ROUTES;

    this.router.events.subscribe(
      (event => {
        if (event instanceof NavigationEnd) {

          const splitURL: Array<string> = event.url.split('/').filter(value => value);
          this.currentIndex = this.menuItems.findIndex(element => {
            return element.path === splitURL[0]
          });

          // Select de current submenu if exists
          if (this.menuItems[this.currentIndex]) {
            const activeSubmenu: MenuRoute[] = this.menuItems[this.currentIndex].submenu.filter(element => {
              return element.path === event.url;
            });
            if (activeSubmenu.length > 0) {
              this.toggleActive(activeSubmenu[0].path);
            }
          }
        }
      })
    )
  }


  public navigateTo(path: string) {
    this.router.navigate([path]).then();
  }

  public toggleActive(elementPath: string): void {
    this.active = elementPath;
  }

}
