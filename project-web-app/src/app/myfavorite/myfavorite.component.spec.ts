import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavoriteComponent } from './myfavorite.component';

describe('MyfavoriteComponent', () => {
  let component: MyfavoriteComponent;
  let fixture: ComponentFixture<MyfavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyfavoriteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyfavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
