import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// @ts-ignore
import RFB from "@novnc/novnc/core/rfb.js";

@Component({
  selector: 'app-remote-desktop',
  templateUrl: './remote-desktop.component.html',
  styleUrls: ['./remote-desktop.component.scss']
})
export class RemoteDesktopComponent implements AfterViewInit {
  clientActive = false;
  @ViewChild('screen', {static: false}) screenDOM: ElementRef;
  rfb: RFB;

  screen: any;

  ngAfterViewInit() {
    this.screen = this.screenDOM.nativeElement;
  }
  
  startClient() {
    let element = document.getElementById('screen');
    console.log(element);
    console.log(screen);
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
    );}
}
