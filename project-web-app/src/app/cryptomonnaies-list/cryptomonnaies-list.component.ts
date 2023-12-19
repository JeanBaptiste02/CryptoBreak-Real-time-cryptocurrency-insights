import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CryptomonnaieDetailComponent } from '../cryptomonnaie-detail/cryptomonnaie-detail.component';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cryptomonnaies-list',
  templateUrl: './cryptomonnaies-list.component.html',
  styleUrls: ['./cryptomonnaies-list.component.css'],
})
export class CryptomonnaiesListComponent implements OnInit {
  cryptocurrencies: any[] = [];
  bannerData: any = [];
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

  coinData: any;
  coinId!: string;
  days: number = 30;
  selectedCryptoGraphData: any;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      },
    ],
    labels: [],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getBannerData();
    this.getAllData();
    this.getGraphData(this.days);
  }

  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe((res) => {
      this.bannerData = res;
    });
  }

  getAllData() {
    this.api
      .getCurrency(this.currency)
      .pipe(
        retry(3),
        catchError((error) => {
          this.loadingError = 'Error loading datas. Please try again later.';
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

  getGraphData(days: number) {
    this.days = days;
    this.api
      .getGrpahicalCurrencyData(this.coinId, this.currency, this.days) // Renommer la méthode à "getGraphicalCurrencyData"
      .subscribe((res) => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          console.log(
            'Data:',
            res.prices.map((a: any) => a[1])
          );
          console.log(
            'Labels:',
            res.prices.map((a: any) => {
              let date = new Date(a[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return this.days === 1 ? time : date.toLocaleDateString();
            })
          );
        });
      });
  }

  showDetails(crypto: any): void {
    console.log('Selected Crypto:', crypto);

    this.selectedCrypto = crypto;
    this.api
      .getGrpahicalCurrencyData(crypto.id, this.currency, this.days)
      .subscribe((graphData) => {
        this.selectedCryptoGraphData = graphData;
      });
  }

  gotoDetails(row: any) {
    this.router.navigate(['detailspage', row.id]);
  }
}
