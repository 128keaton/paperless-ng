import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {DocumentsService} from '../../../api/services/documents.service';
import {forkJoin, fromEvent, merge, Observable, of, ReplaySubject, zip} from 'rxjs';
import {Documents} from '../../../api/models/documents.model';
import {Document} from '../../../api/models/document.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {catchError, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap} from 'rxjs/operators';
import {TagsService} from '../../../api/services/tags.service';
import {Tag} from '../../../api/models/tag.model';
import {Router} from '@angular/router';
import {PageTitleService} from '../../shared/services/page-title.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements AfterViewInit {
  documents: Document[] = [];
  tags: Tag[] = [];
  columns: string[] = ['thumbnail_url', 'added', 'modified', 'title', 'tags', 'download_url'];
  tagsToFetch: string[] = [];
  totalDocuments = 0;
  loadingDocuments = true;
  didError = false;
  searchValue: string;
  search: Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') searchInput: ElementRef;

  constructor(private documentsService: DocumentsService, private tagsService: TagsService, private router: Router, private pageTitleService: PageTitleService) {
    this.pageTitleService.pageTitle = 'Documents'
  }

  ngAfterViewInit(): void {
    this.search = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      filter(Boolean),
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => this.searchValue = this.searchInput.nativeElement.value)
    );

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.search).pipe(
      startWith({}),
      switchMap(() => {
        this.loadingDocuments = true;
        return this.documentsService.getDocuments(this.sort.active, this.sort.direction === 'desc', this.searchValue);
      }),
      map((data: Documents) => {
        this.totalDocuments = data.count;

        data.results.forEach(document => this.tagsToFetch = [...document.tags, ...this.tagsToFetch]);
        this.tagsToFetch = [...new Set(this.tagsToFetch)];

        return data.results;
      }),
      tap((documents: Document[]) => this.documents = documents),
      switchMap(() => {
        return forkJoin(this.tagsToFetch.map(tag => this.fetchTag(tag)))
      }),
      catchError(() => {
        this.loadingDocuments = false;
        this.didError = true;
        return of([]);
      })
    ).subscribe(tags => {
      this.didError = false;
      this.loadingDocuments = false;
      this.tags = tags;
    })
  }

  thumbnailURL(tail: string): string {
    return this.documentsService.getServiceUrl(tail);
  }

  fetchTag(tagURL: string): Observable<Tag> {
    return this.tagsService.getTag(tagURL).pipe(
      map(tag => {
        tag.url = tagURL;
        return tag;
      })
    );
  }

  findTag(tagURL: string): Tag {
    return this.tags.find(tag => tag.url === tagURL);
  }

  download(url: string) {
    window.location.href = this.thumbnailURL(url);
  }

  viewDocument(id: number) {
    this.router.navigate([`/view/${id}`]).then();
  }

}
