import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DocumentsComponent} from './documents/documents.component';
import {DocumentComponent} from './document/document.component';
import {TagsComponent} from './tags/tags.component';


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
  },
  {
    path: 'tags',
    component: TagsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
