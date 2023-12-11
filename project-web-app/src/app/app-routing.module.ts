import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ConnectComponent } from './connect/connect.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'aboutpage', component: AboutComponent },
  { path: 'connectpage', component: ConnectComponent },
  { path: '', component: WelcomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
