import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestinterfaceComponent } from './testinterface.component';

describe('TestinterfaceComponent', () => {
  let component: TestinterfaceComponent;
  let fixture: ComponentFixture<TestinterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestinterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
