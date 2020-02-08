import {NgModule} from '@angular/core';
import {DocumentsService} from './services/documents.service';
import {TagsService} from './services/tags.service';

@NgModule({
  providers: [
    DocumentsService,
    TagsService
  ],
})
export class ApiModule {
}
