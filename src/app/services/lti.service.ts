import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LtiService {
  private baseUrl = "http://localhost:3000/lti/";
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService) 
    {
      this.setLtikHeader();
    }

  getMembers() {
    return this.http.get(this.baseUrl + "members", {
      headers: this.headers
    });
  }

  getTest() {
    return this.http.get(this.baseUrl + "group", {
      headers: this.headers
    });
  }

  private setLtikHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('ltik')}`
    });
  }
}
