import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouramentDetailsComponent } from './tourament-details.component';

describe('TouramentDetailsComponent', () => {
  let component: TouramentDetailsComponent;
  let fixture: ComponentFixture<TouramentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouramentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouramentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
