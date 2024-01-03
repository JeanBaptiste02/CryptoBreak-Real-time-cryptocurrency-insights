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
import { NewsListComponent } from './news-list/news-list.component';
import { WalletComponent } from './wallet/wallet.component';
import { CommunitySectionComponent } from './community-section/community-section.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './beandau-notification/beandau-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    ConnectComponent,
    AboutComponent,
    ContactpageComponent,
    CryptomonnaiesListComponent,
    CryptomonnaieDetailComponent,
    NewsListComponent,
    WalletComponent,
    CommunitySectionComponent,
    ProfileComponent,
    NotificationComponent,
  ],
  imports: [
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
  providers: [CookieService], // Ajout de ce fournisseur
  bootstrap: [AppComponent],
})
export class AppModule {}
