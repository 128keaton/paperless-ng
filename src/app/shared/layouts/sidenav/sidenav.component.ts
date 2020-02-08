import { Component, OnInit } from '@angular/core';
import {MENU_TITLE} from '../../../config/menu.config';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  title: string = MENU_TITLE;

  constructor() { }

  ngOnInit(): void {
  }

}
