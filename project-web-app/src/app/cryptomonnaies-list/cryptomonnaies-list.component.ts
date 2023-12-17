import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-cryptomonnaies-list',
  templateUrl: './cryptomonnaies-list.component.html',
  styleUrl: './cryptomonnaies-list.component.css',
})
export class CryptomonnaiesListComponent implements OnInit {
  cryptocurrencies: any[] = [];
  bannerData: any[] = [];
  currency: string = 'EUR';
  selectedCrypto: any | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getBannerData();
    this.getAllData();
  }

  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe((res) => {
      this.bannerData = res;
      console.log('banner data : ');
      console.log(res);
    });
  }
  getAllData() {
    this.api.getCurrency(this.currency).subscribe((res) => {
      this.cryptocurrencies = res;
      console.log('every datas : ');
      console.log(res);
    });
  }

  showDetails(crypto: any) {
    console.log('Selected Crypto:', crypto);
    this.selectedCrypto = crypto;
  }
}
