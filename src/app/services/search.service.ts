import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, map } from 'rxjs';
import { config } from 'configuration/environment.prod';
import { ApiService } from './api/api.service';
import { ApiHttpRequestType, ApiRequest } from './api/model/api.request';
import { ApiResponse } from './api/model/api.response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private apiService: ApiService
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
        "name": data.text,
        "language": data.currentLang
      }
    }
    let body = JSON.stringify(request)
    console.log("body ", body);
    const apiRequest = new ApiRequest.Builder()
      .withHost(config.api.BASE_URL)
      .withPath(config.api.CONTENT_SEARCH_API)
      .withType(ApiHttpRequestType.POST)
      .withBody(body)
      .withBearerToken(true)
      .withLanguge(data.currentLang)
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

  postContentSearch(data: any, lang: any): Promise<any> {
    let req : any= {};
    if(data['name'])
    {
      req['name'] = data?.name;
    }

    if(data['category'])
    {
      req['category'] = data?.category;
    }

    req['language'] = lang;
   
    const apiRequest = new ApiRequest.Builder()
      .withHost(config.api.BASE_URL)
      .withPath(config.api.CONTENT_SEARCH_API)
      .withType(ApiHttpRequestType.POST)
      .withBody(req)
      .withBearerToken(true)
      .withLanguge(lang)
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
