import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Server } from '../models/server.model';
import { Observable, filter, first, firstValueFrom, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LtiService {
  private baseUrl = "http://localhost:3000/lti/";
  private httpHeader: any;

  serverData$: Observable<Server>;
  serverName$: Observable<string>;
  ltik$: Observable<string>;

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private messageService: MessageService) 
    {
      this.setLtikCookie();
      this.setServerNameCookie();
      this.setExerciseUrl();

      this.setLtikHeader();
      this.getServer();
    }

  getMembers() {
    return this.http.get(this.baseUrl + "members", {headers: this.httpHeader});
  }

  getTest() {
    return this.http.get(this.baseUrl + "group", {headers: this.httpHeader});
  }

  getServer() {
    const serverName = this.cookieService.get("serverName");
    if(!serverName) {
      this.messageService.add({
        severity: "error",
        summary: "Kein Server passend zum Namen gefunden."
      })
    } else {
      let queryParams = new HttpParams();
      queryParams = queryParams.set("serverName", serverName)
  
      this.serverData$ = this.http.get<Server>(this.baseUrl + "server", {
        headers: this.httpHeader,
        params: queryParams
      });
    }
  }

  createServer(server: Server) {
    return this.http.post(this.baseUrl + "server", server, {headers: this.httpHeader})
  }

  private setLtikHeader() {
    this.httpHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.get('ltik')}`
      })
  }

  private setLtikCookie() {
    if(this.route.snapshot.queryParamMap.has("ltik")) {
      console.log("ahllo");
      const ltik = this.route.snapshot.queryParamMap.get("ltik");
      this.cookieService.set('ltik', ltik!, {path: "/"});
      console.log(this.cookieService.get("ltik"));
    }

  }

  private setServerNameCookie() {
    const serverName = this.route.snapshot.queryParamMap.get("serverName");
    if(serverName != null) {
      this.cookieService.set('serverName', serverName, {path: "/"});
    }
  }

  private setExerciseUrl() {
    const exerciseUrl = this.route.snapshot.queryParamMap.get("exerciseUrl");
    if(exerciseUrl != null) {
      this.cookieService.set('exerciseUrl', exerciseUrl, {path: "/"});
    }
  }
}
