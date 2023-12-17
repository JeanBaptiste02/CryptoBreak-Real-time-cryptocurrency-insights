import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cryptomonnaies-list',
  templateUrl: './cryptomonnaies-list.component.html',
  styleUrl: './cryptomonnaies-list.component.css',
})
export class CryptomonnaiesListComponent implements OnInit {
  cryptocurrencies: any[] = [];
  currency: string = 'EUR';
  selectedCrypto: any | null = null;
  loadingError: string | null = null;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'image',
    'id',
    'symbol',
    'name',
    'current_price',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.api
      .getCurrency(this.currency)
      .pipe(
        retry(3),
        catchError((error) => {
          this.loadingError = 'Error loading data. Please try again later.';
          return throwError(error);
        })
      )
      .subscribe(
        (res) => {
          this.cryptocurrencies = res;
          console.log('every datas');
          console.log(res);
          this.dataSource = new MatTableDataSource<any>(this.cryptocurrencies);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  showDetails(crypto: any) {
    console.log('Selected Crypto:', crypto);
    this.selectedCrypto = crypto;
  }
}
