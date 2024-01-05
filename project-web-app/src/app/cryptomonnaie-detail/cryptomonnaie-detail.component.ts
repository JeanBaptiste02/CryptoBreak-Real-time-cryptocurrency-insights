//import { DetailExtractCurrencyService } from '../service/detail-extract-currency.service';
import { ApiService } from './../service/api.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
//import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cryptomonnaie-detail',
  templateUrl: './cryptomonnaie-detail.component.html',
  styleUrl: './cryptomonnaie-detail.component.css',
})
/*----------------------------------------------------------------------------------------------
export class CryptomonnaieDetailComponent implements OnInit, AfterViewInit {
  coinInformation: any;
  uniqueCoinId!: string;
  dataDurationInDays: number = 30;
  chosenCurrency: string = 'EUR';
  public lineChartData: ChartConfiguration<'line'>['data'] = {
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
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: false,
  };
  public lineChartLegend = true;

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private DetailExtractCurrencyService: DetailExtractCurrencyService
  ) {}

  ngAfterViewInit(): void {
    // Move your chart update logic here
    setTimeout(() => {
      if (this.myLineChart && this.myLineChart.chart) {
        this.myLineChart.chart.update();
      }
    }, 200);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.uniqueCoinId = val['id'];
    });
    this.getCoinInfo();
    this.getGraphData(this.dataDurationInDays);
    this.DetailExtractCurrencyService.getCurrency().subscribe((val) => {
      this.chosenCurrency = val;
      this.getGraphData(this.dataDurationInDays);
      this.getCoinInfo();
    });
  }

  getCoinInfo() {
    this.apiService.getCurrencyById(this.uniqueCoinId).subscribe((res) => {
      console.log(this.coinInformation);
      if (this.chosenCurrency === 'USD') {
        res.market_data.current_price.inr = res.market_data.current_price.usd;
        res.market_data.market_cap.inr = res.market_data.market_cap.usd;
      }
      res.market_data.current_price.inr = res.market_data.current_price.inr;
      res.market_data.market_cap.inr = res.market_data.market_cap.inr;
      this.coinInformation = res;
    });
  }
  getGraphData(dataDurationInDays: number) {
    this.dataDurationInDays = dataDurationInDays;
    this.apiService
      .getGrpahicalCurrencyData(
        this.uniqueCoinId,
        //this.chosenCurrency,
        this.dataDurationInDays
      )
      .subscribe((res) => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
              : `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.dataDurationInDays === 1
            ? time
            : date.toLocaleDateString();
        });
      });
  }
} ------------------------------------------------*/

//_______________________________________________________
export class CryptomonnaieDetailComponent implements AfterViewInit, OnInit {
  id: any = null;
  historicData: any = null;
  prices: any = [];
  days: any = 1;
  currency: string = 'eur';
  chartInstance: any;

  newTimeFrame = new Subject<any>();

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  setTimeFrame(days: number) {
    this.days = days;
    this.newTimeFrame.next('new');
  }

  subscription = this.newTimeFrame.subscribe((res) => this.mainFunction());

  mainFunction() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiService
      .getGrpahicalCurrencyData(this.id, this.days) //, 'eur')
      //.getChartData(this.id, this.days, 'eur')
      .subscribe(
        (res) => {
          this.historicData = res.prices;
          this.prices = [];

          this.historicData.map((coin: any) => {
            this.prices.push(coin[1]);
          });

          this.canvas = this.mychart.nativeElement;
          this.ctx = this.canvas.getContext('2d');

          if (this.chartInstance) {
            this.chartInstance.destroy();
          }

          // Create a new Chart instance with updated data
          this.chartInstance = new Chart(this.ctx, {
            type: 'line',
            data: {
              datasets: [
                {
                  label: `Price ( Past ${this.days} days ) in EUR`,
                  data: this.prices,
                  borderColor: '#0fbbda',
                },
              ],
              labels: this.historicData
                ? this.historicData.map((coin: any) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return this.days === 1 ? time : date.toLocaleDateString();
                  })
                : null,
            },
          });
        },
        (error) => {
          if (error.response && error.response.status === 429) {
            // Retry after the suggested delay (in seconds)
            const retryAfterSeconds =
              parseInt(error.response.headers['retry-after'], 10) || 60;
            console.log(
              `Received 429 error. Retrying after ${retryAfterSeconds} seconds.`
            );

            // Implement a delay before retrying
            setTimeout(() => {
              this.mainFunction();
            }, retryAfterSeconds * 1000);
          } else {
            console.error('Error fetching chart data:', error);
          }
        }
      );
  }

  ngAfterViewInit() {
    this.mainFunction();
  }
} //_____________________________*/
