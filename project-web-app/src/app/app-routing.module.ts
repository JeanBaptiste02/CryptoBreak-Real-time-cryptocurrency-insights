import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ConnectComponent } from './connect/connect.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AboutComponent } from './about/about.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { CryptomonnaiesListComponent } from './cryptomonnaies-list/cryptomonnaies-list.component';
import { CryptomonnaieDetailComponent } from './cryptomonnaie-detail/cryptomonnaie-detail.component';
import { NewsListComponent } from './news-list/news-list.component';
import { WalletComponent } from './wallet/wallet.component';
import { CommunitySectionComponent } from './community-section/community-section.component';

const routes: Routes = [
  { path: 'communitypage', component: CommunitySectionComponent },
  { path: 'walletpage', component: WalletComponent },
  { path: 'newspage', component: NewsListComponent },
  { path: 'detailspage/:id', component: CryptomonnaieDetailComponent },
  { path: 'cryptocurrencypage', component: CryptomonnaiesListComponent },
  { path: 'contactpage', component: ContactpageComponent },
  { path: 'aboutpage', component: AboutComponent },
  { path: 'connectpage', component: ConnectComponent },
  { path: 'signupPage', component: SignupFormComponent },
  { path: '', component: WelcomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
