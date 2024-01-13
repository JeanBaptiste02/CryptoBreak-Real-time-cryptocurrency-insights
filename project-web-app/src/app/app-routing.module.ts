import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ConnectComponent } from './connect/connect.component';
import { AboutComponent } from './about/about.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { CryptomonnaiesListComponent } from './cryptomonnaies-list/cryptomonnaies-list.component';
import { CryptomonnaieDetailComponent } from './cryptomonnaie-detail/cryptomonnaie-detail.component';
import { NewsListComponent } from './news-list/news-list.component';
import { WalletComponent } from './wallet/wallet.component';
import { CommunitySectionComponent } from './community-section/community-section.component';
import { ProfileComponent } from './profile/profile.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { MyfavoriteComponent } from './myfavorite/myfavorite.component';

const routes: Routes = [
  { path: 'communitypage', component: CommunitySectionComponent },
  { path: 'walletpage', component: WalletComponent },
  { path: 'newspage', component: NewsListComponent },
  { path: 'detailspage/:id', component: CoinDetailComponent },
  { path: 'cryptocurrencypage', component: CryptomonnaiesListComponent },
  { path: 'contactpage', component: ContactpageComponent },
  { path: 'aboutpage', component: AboutComponent },
  { path: 'connectpage', component: ConnectComponent },
  {
    path: 'ProfilePage',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favoritepage',
    component: MyfavoriteComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: WelcomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
