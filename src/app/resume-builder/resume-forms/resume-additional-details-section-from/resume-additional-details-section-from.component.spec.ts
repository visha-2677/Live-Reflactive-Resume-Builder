import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeAdditionalDetailsSectionFromComponent } from './resume-additional-details-section-from.component';

describe('ResumeAdditionalDetailsSectionFromComponent', () => {
  let component: ResumeAdditionalDetailsSectionFromComponent;
  let fixture: ComponentFixture<ResumeAdditionalDetailsSectionFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeAdditionalDetailsSectionFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeAdditionalDetailsSectionFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
