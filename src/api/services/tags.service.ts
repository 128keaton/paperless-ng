import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_CONFIGURATION} from '../../app/config/api.config';
import {Burly} from 'kb-burly';
import {Tags} from '../models/tags.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiConfiguration = API_CONFIGURATION;

  constructor(private httpClient: HttpClient) {
  }

  getTag(fromURL: string): Observable<Tag> {
    return this.httpClient.get<Tag>(fromURL, {
      headers: this.getHeaders()
    });
  }

  getTags(orderBy?: string, descending?: boolean, search?: string): Observable<Tags> {
    let ordering = null;

    if (orderBy) {
      ordering = `${descending ? '-' : ''}${orderBy}`
    }

    const url = Burly(this.apiConfiguration.url + '/api/tags/').addParam('format', 'json', true)
      .addParam('ordering', ordering)
      .addParam('search', search)
      .get;


    return this.httpClient.get<Tags>(url, {
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    const username = this.apiConfiguration.username;
    const password = this.apiConfiguration.password;

    return new HttpHeaders({
      'Content-Type': 'application-json',
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    })

  }
}
