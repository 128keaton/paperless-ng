import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Documents} from '../models/documents.model';
import {Document} from '../models/document.model';
import {Burly} from 'kb-burly';
import {API_CONFIGURATION} from '../../app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private apiConfiguration = API_CONFIGURATION;

  constructor(private httpClient: HttpClient) {
  }

  getDocuments(orderBy?: string, descending?: boolean, search?: string): Observable<Documents> {
    let ordering = null;

    if (orderBy) {
      ordering = `${descending ? '-' : ''}${orderBy}`
    }

    const url = Burly(this.apiConfiguration.url + '/api/documents/').addParam('format', 'json', true)
      .addParam('ordering', ordering)
      .addParam('search', search)
      .get;


    return this.httpClient.get<Documents>(url, {
      headers: this.getHeaders()
    });
  }

  getDocument(id: number): Observable<Document> {
    const url = Burly(this.apiConfiguration.url + '/api/documents/')
      .addSegment(`${id}`)
      .addParam('format', 'json', true)
      .get;

    return this.httpClient.get<Document>(url, {
      headers: this.getHeaders()
    });
  }

  getServiceUrl(rawURL: string): string {
    return `${this.apiConfiguration.url}${rawURL}`;
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
