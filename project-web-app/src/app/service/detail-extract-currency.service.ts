import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailExtractCurrencyService {
  private selectedCurrency$: BehaviorSubject<string> =
    new BehaviorSubject<string>('EUR');
  constructor() {}

  getCurrency() {
    return this.selectedCurrency$.asObservable();
  }

  setCurrency(currency: string) {
    this.selectedCurrency$.next(currency);
  }
}
