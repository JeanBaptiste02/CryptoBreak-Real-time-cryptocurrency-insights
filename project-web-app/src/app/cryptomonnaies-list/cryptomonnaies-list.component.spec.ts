import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptomonnaiesListComponent } from './cryptomonnaies-list.component';

describe('CryptomonnaiesListComponent', () => {
  let component: CryptomonnaiesListComponent;
  let fixture: ComponentFixture<CryptomonnaiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CryptomonnaiesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptomonnaiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
