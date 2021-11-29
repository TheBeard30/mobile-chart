import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossReportComponent } from './cross-report.component';

describe('CrossReportComponent', () => {
  let component: CrossReportComponent;
  let fixture: ComponentFixture<CrossReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
