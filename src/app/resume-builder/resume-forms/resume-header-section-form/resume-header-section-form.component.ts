import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ResumeDataService } from '../../../../shared/services/resume-data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-resume-header-section-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,FormsModule,RouterModule],
  templateUrl: './resume-header-section-form.component.html',
  styleUrl: './resume-header-section-form.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ResumeHeaderSectionFormComponent implements OnInit {
  resumeHeaderData= {
    firstName: '',
    surname: '',
    city: '',
    country: '',
    pinCode: '',
    phone: '',
    email: ''
  };

  constructor(private resumeDataService:ResumeDataService,private router:Router,private cdr:ChangeDetectorRef){}

  ngOnInit(): void {

    let storeResumeHeaderData=this.getLocalStorage('resume-header-data');

    if(storeResumeHeaderData!== undefined && storeResumeHeaderData){
      this.resumeHeaderData=storeResumeHeaderData;
      this.resumeDataService.updateResumeData(this.resumeHeaderData);
    }
    
  }

  updateResumeData(){
    this.resumeDataService.updateResumeData(this.resumeHeaderData);
  }

  onContinue(){

    this.setLocalStorage('resume-header-data',this.resumeHeaderData);
    this.resumeDataService.updateResumeData(this.resumeHeaderData);

    this.router.navigate(['/resume-builder/experience']);
  }
  onBack(){
    this.router.navigate(['/resume-builder/header']);
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
