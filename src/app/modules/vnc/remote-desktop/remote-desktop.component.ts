import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
// @ts-ignore
import RFB from "@novnc/novnc";
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { LtiService } from 'src/app/services/lti.service';

@Component({
  selector: 'app-remote-desktop',
  templateUrl: './remote-desktop.component.html',
  styleUrls: ['./remote-desktop.component.scss']
})
export class RemoteDesktopComponent implements OnInit {
  clientActive = false;
  @ViewChild('screen', {static: false}) screenDOM: ElementRef;
  @ViewChild('iframe', {static: false}) iframe: ElementRef;
  rfb: RFB;
  screen: any;
  items : any;

  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private ltiService: LtiService
    ) {

  }

  ngOnInit(): void {
    this.setLtik();
    this.ltiService.getTest().subscribe(value => {
      console.log(value);
    })
  }

  ngAfterViewInit() {
    this.screen = this.screenDOM.nativeElement;
    this.createClient();
  }

  async setLtik() {
    if(!this.cookieService.check('ltik') || this.cookieService.get('ltik') == "null") {
      console.log("ahllo")
      const params = await firstValueFrom(this.route.queryParamMap);
      const ltik = params.get('ltik');
      this.cookieService.set('ltik', ltik!);
    }
  }

  createClient() {
    this.clientActive = true;
    const password = "password"; // password of your vnc server
    // Build the websocket URL used to connect
    // let url = "ws://ec2-18-197-37-85.eu-central-1.compute.amazonaws.com:6080/vnc.html?host=ec2-18-197-37-85.eu-central-1.compute.amazonaws.com&port=6080";
    let url = "ws://108.142.121.202:6080/vnc.html?host=108.142.121.202&port=6080";
    // Creating a new RFB object will start a new connection
    this.rfb = new RFB(this.screen, 
      url,
      {
        credentials: {
          "password": password
        }
      }
    );
    this.rfb.scaleViewport = true;
  }

}
