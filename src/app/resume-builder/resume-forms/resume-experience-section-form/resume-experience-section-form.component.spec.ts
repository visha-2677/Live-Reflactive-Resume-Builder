import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeExperienceSectionFormComponent } from './resume-experience-section-form.component';

describe('ResumeExperienceSectionFormComponent', () => {
  let component: ResumeExperienceSectionFormComponent;
  let fixture: ComponentFixture<ResumeExperienceSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeExperienceSectionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeExperienceSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
