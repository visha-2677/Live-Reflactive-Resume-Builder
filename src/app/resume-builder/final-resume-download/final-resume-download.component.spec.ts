import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalResumeDownloadComponent } from './final-resume-download.component';

describe('FinalResumeDownloadComponent', () => {
  let component: FinalResumeDownloadComponent;
  let fixture: ComponentFixture<FinalResumeDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalResumeDownloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalResumeDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
