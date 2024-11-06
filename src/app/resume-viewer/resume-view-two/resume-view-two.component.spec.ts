import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeViewTwoComponent } from './resume-view-two.component';

describe('ResumeViewTwoComponent', () => {
  let component: ResumeViewTwoComponent;
  let fixture: ComponentFixture<ResumeViewTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeViewTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeViewTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
