import { Injectable, OnInit, signal, Signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeDataService  {

  // Initial default values for the form fields
  private resumeDataHeaderSubject = new BehaviorSubject<any>({
    firstName: '',
    surname: '',
    city: '',
    country: '',
    pinCode: '',
    phone: '',
    email: ''
  });

  private  resumeDataExperienceSubject=new BehaviorSubject<any>({
    jobTitle: '',
    employer: '',
    city: '',
    country:'',
    startDate: '',
    endDate: '',
    description:''
  })


  private resumeDataEducationSubject=new BehaviorSubject<any>(''); 
  private resumeDataSkillsSubject=new BehaviorSubject<any>('');
  private resumeDataSummarySubject=new BehaviorSubject<any>('');
  private resumeDataAddMoreSubject=new BehaviorSubject<any>('');

  private modalStateSubject=new BehaviorSubject<any>(false);
  private changeTemplateModalSubject=new BehaviorSubject<any>(false);

  // Observable for other components to subscribe to
  resumeDataHeader$ = this.resumeDataHeaderSubject.asObservable();
  resumeDataExperience$ = this.resumeDataExperienceSubject.asObservable();
  resumeDataEducation$=this.resumeDataEducationSubject.asObservable();
  resumeDataSkills$=this.resumeDataSkillsSubject.asObservable();
  resumeDataSummary$=this.resumeDataSummarySubject.asObservable();
  resumeDataAddMore$=this.resumeDataAddMoreSubject.asObservable();

  /**
   * Custom Modal States
   */
  modalState$=this.modalStateSubject.asObservable();
  changeTemplateModalState$=this.changeTemplateModalSubject.asObservable();

  
  constructor() { }


  // Method to update the form data
  updateResumeData(data: any) {
    this.resumeDataHeaderSubject.next(data);
  }

  updateResumeExperienceDate(data:any){
    this.resumeDataExperienceSubject.next(data);
  }

  // updateResumeEducationData(data:any){
  //   // this.resumeEducationData.update((prev)=>({
  //   //   ...prev,
  //   //   ...data
  //   // }));
  //   // this.resumeEducationData.set({ ...this.getResumeEducationData(), ...data });
  //    // Update each property of the signal with new values
  //    this.resumeEducationData.update((currentData) => (data));
  // }

  updateResumeEducationData(data:any){
    this.resumeDataEducationSubject.next(data);
  }


  updateResumeSkillsData(data:any){
    this.resumeDataSkillsSubject.next(data);
  }
  
  updateResumeSummaryData(data:any){
    this.resumeDataSummarySubject.next(data);
  }

  
  updateResumeAddMoreDate(data:any){
    this.resumeDataAddMoreSubject.next(data);
  }


  // Open the modal by setting the state to true
  openModal() {
    this.modalStateSubject.next(true);
  }

  // Close the modal by setting the state to false
  closeModal() {
    this.modalStateSubject.next(false);
  }

  openChangeTemplateModal(){
    this.changeTemplateModalSubject.next(true);
  }

  closeChangeTemplateModal(){
    this.changeTemplateModalSubject.next(false);
  }

}
