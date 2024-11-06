import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSkillsSectionFormComponent } from './resume-skills-section-form.component';

describe('ResumeSkillsSectionFormComponent', () => {
  let component: ResumeSkillsSectionFormComponent;
  let fixture: ComponentFixture<ResumeSkillsSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeSkillsSectionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeSkillsSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
