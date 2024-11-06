import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmationModalComponent } from './mat-confirmation-modal.component';

describe('MatConfirmationModalComponent', () => {
  let component: MatConfirmationModalComponent;
  let fixture: ComponentFixture<MatConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
