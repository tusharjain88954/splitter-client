import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) { }

  name: string | undefined;
  createGroup(name: any) {
    return this.http.post(environment.BaseUrl + '/group', name);
  }

}
