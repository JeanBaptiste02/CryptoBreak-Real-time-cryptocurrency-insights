import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ConnectComponent } from './connect/connect.component';
import { AboutComponent } from './about/about.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { CryptomonnaiesListComponent } from './cryptomonnaies-list/cryptomonnaies-list.component';
import { CryptomonnaieDetailComponent } from './cryptomonnaie-detail/cryptomonnaie-detail.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NewsListComponent } from './news-list/news-list.component';
import { WalletComponent } from './wallet/wallet.component';
import { CommunitySectionComponent } from './community-section/community-section.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './bandeau-de-notification/bandeau-de-notification.component';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import { MyfavoriteComponent } from './myfavorite/myfavorite.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    ConnectComponent,
    AboutComponent,
    ContactpageComponent,
    CryptomonnaiesListComponent,
    CryptomonnaieDetailComponent,
    CoinDetailComponent,
    LoadingSpinnerComponent,
    NewsListComponent,
    WalletComponent,
    CommunitySectionComponent,
    ProfileComponent,
    NotificationComponent,
    AdminSpaceComponent,
    MyfavoriteComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
