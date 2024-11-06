import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumePreviewComponent } from '../../resume-viewer/resume-preview/resume-preview.component';

@Component({
  selector: 'app-final-resume-download',
  standalone: true,
  imports: [ResumePreviewComponent],
  templateUrl: './final-resume-download.component.html',
  styleUrl: './final-resume-download.component.scss'
})
export class FinalResumeDownloadComponent implements OnInit {



  ngOnInit(): void {
    
  }


  downloadPDF() {
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

  onBack(){

  }

  onContinue(){

  }
}
