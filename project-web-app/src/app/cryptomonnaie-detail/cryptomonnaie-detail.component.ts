import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cryptomonnaie-detail',
  templateUrl: './cryptomonnaie-detail.component.html',
  styleUrl: './cryptomonnaie-detail.component.css',
})
export class CryptomonnaieDetailComponent {
  @Input() selectedCrypto: any;
}
