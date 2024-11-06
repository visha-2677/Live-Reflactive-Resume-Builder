import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ResumeDataService } from '../../../../shared/services/resume-data.service';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-resume-summary-section-from',
  standalone: true,
  imports: [CKEditorModule,FormsModule,CommonModule],
  templateUrl: './resume-summary-section-from.component.html',
  styleUrl: './resume-summary-section-from.component.scss'
})
export class ResumeSummarySectionFromComponent {
  public Editor = ClassicEditor;
  summaryInput='Enter your summary';
  // Minimal toolbar configuration, you can add more features later
  editorConfig = {
    // ui: 'pt',
    // language: 'pt',
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        '|', 
        'bulletedList',
        'numberedList',
      ],
    },
  }
  constructor(private resumeDataService:ResumeDataService,private router:Router){}


  
  ngOnInit(): void {

    let storeSummary=this.getLocalStorage('resume-summary-data');
    if(storeSummary !== undefined && storeSummary ){
      this.summaryInput=storeSummary;
    }
  }

  onBack(){
    this.router.navigate(['/resume-builder/skills']);
  }
  onContinue(){ 
    this.setLocalStorage('resume-summary-data',this.summaryInput);
    this.router.navigate(['/resume-builder/additional-details']);
  }

  updateResumeData(){
    this.resumeDataService.updateResumeSummaryData(this.summaryInput);
  }

  

  setLocalStorage(typeOfString: any, storeData: any) {
    localStorage.setItem(typeOfString, JSON.stringify(storeData));
  }
  getLocalStorage(typeOfString: any) {
    let localStorageData = localStorage.getItem(typeOfString);
    if (localStorageData) {
      return JSON.parse(localStorageData);
    }
  }
}
