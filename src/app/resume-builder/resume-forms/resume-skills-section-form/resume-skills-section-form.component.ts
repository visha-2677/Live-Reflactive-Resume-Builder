import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ResumeDataService } from '../../../../shared/services/resume-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-skills-section-form',
  standalone: true,
  imports: [CKEditorModule,FormsModule,CommonModule],
  templateUrl: './resume-skills-section-form.component.html',
  styleUrl: './resume-skills-section-form.component.scss'
})
export class ResumeSkillsSectionFormComponent implements OnInit {

  public Editor = ClassicEditor;

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
    height: '600px',
    width: '100%'
  };
  skillsInput='<ul> <li> Add Your Skills ! </li> </ul> ';

  constructor(private resumeDataService:ResumeDataService,private router:Router){}

  ngOnInit(): void {

    let storeSkills=this.getLocalStorage('resume-skills-data');
    if(storeSkills !== undefined && storeSkills ){
      this.skillsInput=storeSkills;
    }
  }

  onBack(){
    this.router.navigate(['/resume-builder/education'])
  }
  onContinue(){ 
    this.setLocalStorage('resume-skills-data',this.skillsInput);
    this.router.navigate(['/resume-builder/summary']);
  }

  updateResumeData(){
    this.resumeDataService.updateResumeSkillsData(this.skillsInput);
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
