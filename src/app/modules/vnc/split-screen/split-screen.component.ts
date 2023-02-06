import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-split-screen',
  templateUrl: './split-screen.component.html',
  styleUrls: ['./split-screen.component.scss']
})
export class SplitScreenComponent implements OnInit {
  exerciseUrl: SafeResourceUrl;

  constructor(
    private cookieService: CookieService,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.exerciseUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.cookieService.get("exerciseUrl"));
  }


}
