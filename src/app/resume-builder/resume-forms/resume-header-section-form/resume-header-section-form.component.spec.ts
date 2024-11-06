import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeHeaderSectionFormComponent } from './resume-header-section-form.component';

describe('ResumeHeaderSectionFormComponent', () => {
  let component: ResumeHeaderSectionFormComponent;
  let fixture: ComponentFixture<ResumeHeaderSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeHeaderSectionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeHeaderSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
