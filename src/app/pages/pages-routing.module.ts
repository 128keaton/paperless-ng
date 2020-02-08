import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DocumentsComponent} from './documents/documents.component';
import {DocumentComponent} from './document/document.component';


const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent,
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'documents',
    redirectTo: ''
  },
  {
    path: 'view/:id',
    component: DocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
