import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VNCRoutingModule } from './vnc-routing.module';
import { RemoteDesktopComponent } from './remote-desktop/remote-desktop.component';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {SplitterModule} from 'primeng/splitter';
import {SpeedDialModule} from 'primeng/speeddial';
import { SplitScreenComponent } from './split-screen/split-screen.component';
import { LtiService } from 'src/app/services/lti.service';
@NgModule({
  declarations: [
    RemoteDesktopComponent,
    SplitScreenComponent
  ],
  imports: [
    CommonModule,
    VNCRoutingModule,
    ButtonModule,
    DialogModule,
    SplitterModule,
    SpeedDialModule
  ]
})
export class VNCModule { }
