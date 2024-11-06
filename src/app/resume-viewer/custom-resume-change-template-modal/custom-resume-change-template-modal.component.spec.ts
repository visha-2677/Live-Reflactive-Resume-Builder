import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomResumeChangeTemplateModalComponent } from './custom-resume-change-template-modal.component';

describe('CustomResumeChangeTemplateModalComponent', () => {
  let component: CustomResumeChangeTemplateModalComponent;
  let fixture: ComponentFixture<CustomResumeChangeTemplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomResumeChangeTemplateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomResumeChangeTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
