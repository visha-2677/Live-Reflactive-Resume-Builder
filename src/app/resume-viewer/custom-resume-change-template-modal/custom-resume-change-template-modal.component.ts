import { Component } from '@angular/core';
import { ResumeDataService } from '../../../shared/services/resume-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-resume-change-template-modal',
  standalone: true,
  imports: [],
  templateUrl: './custom-resume-change-template-modal.component.html',
  styleUrl: './custom-resume-change-template-modal.component.scss'
})
export class CustomResumeChangeTemplateModalComponent {
  isVisible = false;
  private subscription!: Subscription;

  // Sample data for templates and resume preview
  colors = ['#333333', '#FFFFFF', '#007BFF', '#28A745', '#FFC107', '#17A2B8'];
  templates = [
    { imageUrl: '' },
    { imageUrl: '' },
    { imageUrl: '' }
  ];
  resumeData = {
    name: 'Vishal Vaishnav',
    contact: '129823409 • vishalvaishnav2677@gmail.com • Ahmedabad 380061',
    skills: 'Cash register operation, POS system operation, Sales expertise, Teamwork',
    experience: '5 years of retail sales experience...'
  };

  constructor(private resumeDataService: ResumeDataService) {}

  ngOnInit() {
    this.subscription = this.resumeDataService.changeTemplateModalState$.subscribe((isOpen) => {
      console.log("isOpen ",isOpen)
      this.isVisible = isOpen;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeModal() {
    this.resumeDataService.closeModal();
  }
}
