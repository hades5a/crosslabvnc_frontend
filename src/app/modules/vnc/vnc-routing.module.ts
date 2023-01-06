import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteDesktopComponent } from './remote-desktop/remote-desktop.component';

const routes: Routes = [
  {path: '', component: RemoteDesktopComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VNCRoutingModule { }
