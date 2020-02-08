import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap} from 'rxjs/operators';
import {Tag} from '../../../api/models/tag.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TagsService} from '../../../api/services/tags.service';
import {Tags} from '../../../api/models/tags.model';
import {PageTitleService} from '../../shared/services/page-title.service';
import {rowsAnimation} from '../../shared/animations/table.anim';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  animations: [rowsAnimation],
})
export class TagsComponent implements AfterViewInit {
  tags: Tag[] = [];
  columns: string[] = ['insensitive', 'name', 'slug'];
  totalTags = 0;
  loadingTags = true;
  didError = false;
  searchValue: string;
  search: Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') searchInput: ElementRef;

  constructor(private tagsService: TagsService, private pageTitleService: PageTitleService) {
    this.pageTitleService.pageTitle = 'Tags'
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
        this.loadingTags = true;
        return this.tagsService.getTags(this.sort.active, this.sort.direction === 'desc', this.searchValue);
      }),
      map((data: Tags) => {
        this.totalTags = data.count;

        return data.results;
      }),
      tap((tags: Tag[]) => this.tags = tags),
      catchError(() => {
        this.loadingTags = false;
        this.didError = true;
        return of([]);
      })
    ).subscribe(tags => {
      this.didError = false;
      this.loadingTags = false;
      this.tags = tags;
    })
  }

}
