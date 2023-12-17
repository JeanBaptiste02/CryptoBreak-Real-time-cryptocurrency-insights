import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ConnectComponent } from './connect/connect.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { CryptomonnaiesListComponent } from './cryptomonnaies-list/cryptomonnaies-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgChartsModule } from 'ng2-charts';
import { CryptomonnaieDetailComponent } from './cryptomonnaie-detail/cryptomonnaie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    ConnectComponent,
    AboutComponent,
    ContactpageComponent,
    CryptomonnaiesListComponent,
    CryptomonnaieDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
