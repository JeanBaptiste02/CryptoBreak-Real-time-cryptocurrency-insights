import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptomonnaieDetailComponent } from './cryptomonnaie-detail.component';

describe('CryptomonnaieDetailComponent', () => {
  let component: CryptomonnaieDetailComponent;
  let fixture: ComponentFixture<CryptomonnaieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CryptomonnaieDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptomonnaieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
