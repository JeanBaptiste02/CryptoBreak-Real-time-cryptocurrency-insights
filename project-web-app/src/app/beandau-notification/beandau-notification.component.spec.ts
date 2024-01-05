import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeandauNotificationComponent } from './beandau-notification.component';

describe('BeandauNotificationComponent', () => {
  let component: BeandauNotificationComponent;
  let fixture: ComponentFixture<BeandauNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeandauNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeandauNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
