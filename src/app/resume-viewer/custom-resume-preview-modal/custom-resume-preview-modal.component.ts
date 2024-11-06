import { Component, EventEmitter, Output } from '@angular/core';
import { ResumeViewComponent } from "../resume-view/resume-view.component";
import { Subscription } from 'rxjs';
import { ResumeDataService } from '../../../shared/services/resume-data.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-custom-resume-preview-modal',
  standalone: true,
  imports: [ResumeViewComponent],
  templateUrl: './custom-resume-preview-modal.component.html',
  styleUrl: './custom-resume-preview-modal.component.scss'
})
export class CustomResumePreviewModalComponent {
  isVisible = false; // controls modal visibility
  private subscription!: Subscription;

  constructor(private resumeDataService:ResumeDataService ) {}

  ngOnInit() {
    // Subscribe to the modal state to toggle visibility
    this.subscription = this.resumeDataService.modalState$.subscribe((state:any) => {
      this.isVisible = state;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeModal() {
    // Close the modal using the service
    this.resumeDataService.closeModal();
  }
  onDownload(){
    const resumeDownload = document.getElementById('resume-download'); // Add an ID to your container in the HTML
    if (!resumeDownload) {
      console.error('Resume container not found!');
      return;
    }

    html2canvas(resumeDownload, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');

      // Calculate the PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    });
  }
}
