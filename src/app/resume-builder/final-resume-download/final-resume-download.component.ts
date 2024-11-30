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
  
    // Render the container into a canvas
    html2canvas(resumeDownload, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Full canvas image
      const pdf = new jsPDF('p', 'pt', 'a4'); // Create a new jsPDF instance
  
      // PDF dimensions in points
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 595.28 pt (A4 width)
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 841.89 pt (A4 height)
  
      // Canvas dimensions in pixels
      const canvasWidth = canvas.width; // Canvas width in pixels
      const canvasHeight = canvas.height; // Canvas height in pixels
  
      // Scale factor to fit canvas content into PDF width
      const scaleFactor = pdfWidth / canvasWidth;
  
      // Scaled canvas height in PDF coordinates
      const scaledCanvasHeightInPDF = canvasHeight * scaleFactor;
  
      let position = 0; // Tracks the vertical position in the canvas
  
      // Loop through the canvas content and add pages as necessary
      while (position < scaledCanvasHeightInPDF) {
        // Draw the current portion of the canvas on the PDF
        const sourceY = position / scaleFactor; // Y-offset in canvas pixels
        const visibleHeightInCanvas = pdfHeight / scaleFactor; // Height of one PDF page in canvas pixels
  
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvasWidth;
        tempCanvas.height = visibleHeightInCanvas;
  
        const tempContext = tempCanvas.getContext('2d');
        if (tempContext) {
          // Draw the portion of the canvas corresponding to the current page
          tempContext.drawImage(
            canvas,
            0, sourceY, // Source x, y
            canvasWidth, visibleHeightInCanvas, // Source width, height
            0, 0, // Destination x, y
            canvasWidth, visibleHeightInCanvas // Destination width, height
          );
  
          // Convert the temporary canvas to a data URL and add it to the PDF
          const pageImgData = tempCanvas.toDataURL('image/png');
          pdf.addImage(pageImgData, 'PNG', 10, 40, pdfWidth, pdfHeight);
        }
  
        position += pdfHeight; // Move to the next page's starting point
  
        console.log("execute add page ", position, scaledCanvasHeightInPDF);
        // Add a new page if there's more content to render
        if (position < scaledCanvasHeightInPDF) {
          pdf.addPage();
        }
      }
       // Add clickable email link
    const email = resumeDownload.querySelector('a[href^="mailto:"]')?.getAttribute('href');
    if (email) {
      // Adjust coordinates and dimensions for the email link
      pdf.link(150, 50, 200, 20, { url: email }); // Adjust x, y, width, height as needed
    }

    // Add clickable website/social links if they exist
    const links = resumeDownload.querySelectorAll('a:not([href^="mailto:"])');
    links.forEach((link) => {
      const url = link.getAttribute('href');
      if (url) {
        const rect = link.getBoundingClientRect();
        const x = rect.left * scaleFactor; // Convert to PDF units
        const y = rect.top * scaleFactor;
        const width = rect.width * scaleFactor;
        const height = rect.height * scaleFactor;

        pdf.link(x, y, width, height, { url });
      }
    });
      // Save the PDF
      pdf.save('resume.pdf');
    });
  }
  
  
  
  
  
  
  onBack(){

  }

  onContinue(){

  }
}
