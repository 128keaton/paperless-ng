import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainNavigationComponent} from './layouts/main-navigation/main-navigation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ToolbarComponent} from './layouts/toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SidenavComponent} from './layouts/sidenav/sidenav.component';
import {MenuComponent} from './layouts/sidenav/menu/menu.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {SpinnerComponent} from './spinner/spinner.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [MainNavigationComponent, ToolbarComponent, SidenavComponent, MenuComponent, SpinnerComponent, MainLayoutComponent, FooterComponent],
  exports: [
    SpinnerComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    RouterModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule {
}
