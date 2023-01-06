import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VNCRoutingModule } from './vnc-routing.module';
import { RemoteDesktopComponent } from './remote-desktop/remote-desktop.component';
import { ButtonModule } from 'primeng/button'


@NgModule({
  declarations: [
    RemoteDesktopComponent
  ],
  imports: [
    CommonModule,
    VNCRoutingModule,
    ButtonModule
  ]
})
export class VNCModule { }
