import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { ResumeDataService } from '../../../shared/services/resume-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, isPlatformBrowser, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-resume-view',
  standalone: true,
  imports: [JsonPipe,DatePipe],
  templateUrl: './resume-view.component.html',
  styleUrl: './resume-view.component.scss'
})
export class ResumeViewComponent {
  
  resumeHeaderData: any = {};
  resumeExperienceData:any=[];
  resumeEducationData:any=[]
  resumeSkillsData:any;
  resumeSummaryData: any;
  resumeAddMoreData:any=[];
  matRef: any;

  constructor(private resumeDataService: ResumeDataService,private cdr:ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: object,private _matDialog:MatDialog) {
    // if (this.isBrowser()) {
    //   this.resumeEducationData = this.resumeDataService.resumeEducationData;
    //   const storeResumeEducationData = this.getLocalStorage('resume-education-data');
    //   if (JSON.stringify(storeResumeEducationData) !== JSON.stringify(this.resumeEducationData())) {
    //     console.log("storeResumeEducationData ",storeResumeEducationData)
    //     this.resumeDataService.updateResumeEducationData(storeResumeEducationData);
    //   }
    // }

    // // Step 2: Set up an effect that watches for changes to the resumeEducationData signal
    // effect(() => {
    //   const updatedData = this.resumeEducationData();
    //   console.log('Updated resumeEducationData:', updatedData);

    //   // Avoid updating localStorage or the signal unnecessarily
    //   const storedData = this.getLocalStorage('resume-education-data');
    //   if (JSON.stringify(updatedData) !== JSON.stringify(storedData)) {
    //     this.setLocalStorage('resume-education-data', updatedData);
    //   }
    // }, { allowSignalWrites: false });
  }

  ngOnInit(): void {
    // Subscribe to the form data from the service
    this.resumeDataService.resumeDataHeader$.subscribe(data => {
      this.resumeHeaderData = data;
      this.cdr.markForCheck()

    });
    if(this.isObjectEmpty(this.resumeHeaderData)){
      this.resumeHeaderData=this.getLocalStorage('resume-header-data');
    }

    this.resumeDataService.resumeDataExperience$.subscribe(data =>{
      this.resumeExperienceData=data;
      this.cdr.markForCheck()

    })
  
    if(this.isObjectEmpty(this.resumeExperienceData)){
      this.resumeExperienceData=this.getLocalStorage('resume-experience-data');
    }

    this.resumeDataService.resumeDataEducation$.subscribe(data =>{
      console.log("Education ",data)
      this.resumeEducationData=data;
      this.cdr.markForCheck();
    })
    if(!this.resumeEducationData){
      this.resumeEducationData=this.getLocalStorage('resume-education-data');
    }

    this.resumeDataService.resumeDataSkills$.subscribe(data => {
      this.resumeSkillsData=data;
      this.cdr.markForCheck();
    })

    if(!this.resumeSkillsData){
      this.resumeSkillsData=this.getLocalStorage("resume-skills-data");
    }

    
    this.resumeDataService.resumeDataSummary$.subscribe(data => {
      this.resumeSummaryData=data;
      this.cdr.markForCheck();
    })

    if(!this.resumeSummaryData){
      this.resumeSummaryData=this.getLocalStorage("resume-summary-data");
    }

    this.resumeDataService.resumeDataAddMore$.subscribe(data => {
      this.resumeAddMoreData=data;
      this.cdr.markForCheck();
    })

    if(!this.resumeAddMoreData){
      this.resumeAddMoreData=this.getLocalStorage("resume-add-more-data");
    }
    
    this.cdr.markForCheck()

  }
  // Method to check if the environment is a browser
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);  // Use isPlatformBrowser to check
  }

  isObjectEmpty(obj:any) {
    // Loop through the object keys
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        // Check if the value is NOT empty
        if (
          value !== '' &&       // not an empty string
          value !== null &&     // not null
          value !== undefined // not undefined
          // !(Array.isArray(value) && value.length === 0) && // not an empty array
          // !(typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) // not an empty object
        ) {
          return false;  // Return false if any value is not empty
        }
      }
    }
    return true;  // Return true if all values are empty
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
