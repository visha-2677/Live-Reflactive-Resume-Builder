import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeEducationSectionFormComponent } from './resume-education-section-form.component';

describe('ResumeEducationSectionFormComponent', () => {
  let component: ResumeEducationSectionFormComponent;
  let fixture: ComponentFixture<ResumeEducationSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeEducationSectionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeEducationSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
