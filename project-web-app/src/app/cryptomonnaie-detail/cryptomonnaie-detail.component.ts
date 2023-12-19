import { DetailExtractCurrencyService } from '../service/detail-extract-currency.service';
import { ApiService } from './../service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-cryptomonnaie-detail',
  templateUrl: './cryptomonnaie-detail.component.html',
  styleUrl: './cryptomonnaie-detail.component.css',
})
export class CryptomonnaieDetailComponent {
  coinInformation: any;
  uniqueCoinId!: string;
  dataDurationInDays: number = 30;
  chosenCurrency: string = 'EUR';
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

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private DetailExtractCurrencyService: DetailExtractCurrencyService
  ) {}

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
        this.chosenCurrency,
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
}
