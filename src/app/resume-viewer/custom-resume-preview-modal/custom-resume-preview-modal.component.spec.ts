import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomResumePreviewModalComponent } from './custom-resume-preview-modal.component';

describe('CustomResumePreviewModalComponent', () => {
  let component: CustomResumePreviewModalComponent;
  let fixture: ComponentFixture<CustomResumePreviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomResumePreviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomResumePreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
