import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// @ts-ignore
import RFB from "@novnc/novnc";
import { CookieService } from 'ngx-cookie-service';
import { Observable, firstValueFrom, switchMap, tap, windowToggle } from 'rxjs';
import { Server } from 'src/app/models/server.model';
import { LtiService } from 'src/app/services/lti.service';

@Component({
  selector: 'app-remote-desktop',
  templateUrl: './remote-desktop.component.html',
  styleUrls: ['./remote-desktop.component.scss']
})
export class RemoteDesktopComponent implements OnInit {
  clientActive = false;
  @ViewChild('screen', {static: false}) screenDOM: ElementRef;
  rfb: RFB;
  screen: any;
  items : any;

  serverData$: Observable<Server>;

  constructor(
    private ltiService: LtiService,
    private router: Router,
    private cookieService: CookieService
    ) {}

  ngOnInit(): void {
    this.serverData$ = this.ltiService.serverData$;
    this.items = [
      {
        icon: 'pi pi-desktop',
        command: () => {
          if(this.router.url.includes("split")) {
            const url = this.router.serializeUrl(
              this.router.createUrlTree(["vnc"])
            );
            window.open(url);
            window.location.href = this.cookieService.get("exerciseUrl");
          } else {
            this.router.navigate(["vnc", "split"]);
          }
        }
    },
    {
        icon: 'pi pi-refresh',
        command: () => {
          navigator.clipboard.readText().then(text => {
            this.rfb.clipboardPasteFrom(text);
          })
        }
    },
    ]
  }

  ngAfterViewInit() {
    this.screen = this.screenDOM.nativeElement;
    this.serverData$.subscribe(server => {
      this.rfb = this.createClient(server);
    })

  }

  createClient(server: Server) {
    const password = server.password;

    let webSocketUrl = `ws://${server.host}:${server.port}/vnc.html?host=${server.host}&port=${server.port}`;    

    let rfb = new RFB(this.screen, 
      webSocketUrl,
      {
        credentials: {
          "password": password
        }
      }
    );
    rfb.scaleViewport = true;

    return rfb;
  }

}
