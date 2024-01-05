import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, lastValueFrom, map, tap, throwError } from 'rxjs';
import { config } from 'src/environments/environment.prod';
import { ApiService } from './api/api.service';
import { ApiHttpRequestType, ApiRequest } from './api/model/api.request';
import { ApiResponse } from './api/model/api.response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) { }

  async postSearchContext(data: any, audio: boolean): Promise<any> {
    let request = {};
    if (audio) {
      request = {
        "audio": data.text,
        "language": data.currentLang
      }
    } else {
      request = {
        "text": data.text,
        "language": data.currentLang
      }
    }
    let body = JSON.stringify(request)
    console.log("body ", body);
    const apiRequest = new ApiRequest.Builder()
      .withHost(config.api.BASE_URL)
      .withPath(config.api.CONTEXT_SEARCH)
      .withType(ApiHttpRequestType.POST)
      .withBody(body)
      .withBearerToken(true)
      .withLanguge(this.translate.currentLang)
      .build()
    return lastValueFrom(this.apiService.fetch(apiRequest).pipe(
      map((response: ApiResponse<any>) => {
        return response.body;
      }),
      catchError((err) => {
        throw err;
      })
    ));
  }

  postContentSearch(data: any): Promise<any> {
    let request = {
      request: {
        query: data.query,
        filters: data.filter ?? ""
      }
    }
    const apiRequest = new ApiRequest.Builder()
      .withHost(config.api.BASE_URL)
      .withPath(config.api.CONTENT_SEARCH_API)
      .withType(ApiHttpRequestType.POST)
      .withBody(request)
      .withBearerToken(true)
      .build()
    return lastValueFrom(this.apiService.fetch(apiRequest).pipe(
      map((response: ApiResponse) => {
        return response.body.result;
      }),
      catchError((err) => {
        throw err
      })
    ));
  }
}
