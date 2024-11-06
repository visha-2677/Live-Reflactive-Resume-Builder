import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSummarySectionFromComponent } from './resume-summary-section-from.component';

describe('ResumeSummarySectionFromComponent', () => {
  let component: ResumeSummarySectionFromComponent;
  let fixture: ComponentFixture<ResumeSummarySectionFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeSummarySectionFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeSummarySectionFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
