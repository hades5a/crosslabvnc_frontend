import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteDesktopComponent } from './remote-desktop/remote-desktop.component';
import { SplitScreenComponent } from './split-screen/split-screen.component';

const routes: Routes = [
  {path: 'split', component: SplitScreenComponent},
  {path: '', component: RemoteDesktopComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VNCRoutingModule { }
