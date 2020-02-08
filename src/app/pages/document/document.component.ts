import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, forkJoin, merge, Observable, of, Subscription, zip} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {DocumentsService} from '../../../api/services/documents.service';
import {Document} from '../../../api/models/document.model';
import {PageTitleService} from '../../shared/services/page-title.service';
import {TagsService} from '../../../api/services/tags.service';
import {Tag} from '../../../api/models/tag.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: BehaviorSubject<Document> = new BehaviorSubject<Document>(null);
  documentTitle: BehaviorSubject<string> = new BehaviorSubject<string>('');
  documentTags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);

  isLoading = true;
  didError = false;

  constructor(private route: ActivatedRoute, private tagsService: TagsService, private documentsService: DocumentsService, private pageTitleService: PageTitleService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
       switchMap(params => this.documentsService.getDocument(params['id'])),
       catchError(() => {
         this.isLoading = false;
         this.didError = true;
         return of(null);
       })
     ).subscribe((document: Document) => {
        if (document) {
          this.pageTitleService.pageTitle = 'Document - ' + document.title;
          this.document.next(document);
          this.documentTitle.next(document.title);
          forkJoin(document.tags.map(tag => this.tagsService.getTag(tag))).subscribe(tags => {
            this.documentTags.next(tags);
            this.documentTags.complete();
          });
          this.isLoading = false;
          this.didError = false;
        }
    });
  }

  ngOnDestroy() {
  }

  download(url: string) {
    window.location.href = this.documentsService.getServiceUrl(url);
  }

  back() {
    this.router.navigate(['documents']).then();
  }

  thumbnail(url: string) {
    return this.documentsService.getServiceUrl(url);
  }
}
