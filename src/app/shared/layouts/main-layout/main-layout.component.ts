import { Component, OnInit } from '@angular/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface;
  public currentTheme: string = 'minimal-dark-theme';


  ngOnInit() {
  }

}
