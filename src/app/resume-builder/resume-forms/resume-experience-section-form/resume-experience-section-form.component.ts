import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ResumeDataService } from '../../../../shared/services/resume-data.service';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatConfirmationModalComponent } from '../../../../shared/pages/mat-confirmation-modal/mat-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-resume-experience-section-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,FormsModule,RouterModule,MatDatepickerModule,CKEditorModule,ReactiveFormsModule],
  templateUrl: './resume-experience-section-form.component.html',
  styleUrl: './resume-experience-section-form.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ResumeExperienceSectionFormComponent implements OnInit,AfterViewInit {
  resumeExperienceData= [];
  resumeReactiveForm:any;

  public Editor = ClassicEditor;
  public resumeExpDescriptionData = '<ul> <li> Write Your Experience! </li><li> To Achive Something! </li><li> Type something here! </li> </ul> ';
  storeResumeExperienceData:any;
  @ViewChild('downBtn') downBtn!:ElementRef;

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
  };
  matRef: any;

  constructor(private router:Router,private resumeDataService:ResumeDataService,public _matDialog: MatDialog,private cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    this.resumeReactiveForm=new FormGroup({
      experience:new FormArray([])
    })
    
    let storeResumeExperienceData=this.getLocalStorage('resume-experience-data');

    if(storeResumeExperienceData!== undefined && storeResumeExperienceData){
      this.resumeExperienceData=storeResumeExperienceData;
      this.resumeDataService.updateResumeExperienceDate(this.resumeExperienceData);
      this.resumeExperienceData.forEach((element:any)=>{
        this.experienceArray.push(this.preparedControl(element));
      })
    } 
    else{
      this.experienceArray.push(this.preparedControl());
    }

    this.resumeReactiveForm.get('experience')?.valueChanges.subscribe((data:any) => {
      this.resumeDataService.updateResumeExperienceDate(data);
    });
  }
  ngAfterViewInit(): void {
    
    if(this.experienceArray.length >1){
      this.downBtn.nativeElement.style.visibility="visible";
    }
  }

  //get gpArray
  get experienceArray(): any {
    return this.resumeReactiveForm.get('experience') as FormArray<any>;
  }

  /**
   * prepared controls
   * @returns
   */
  preparedControl(toPatchData: any = {}) {
    const control = new FormGroup({
      jobTitle: new FormControl('',Validators.required),
      employer: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      country :new FormControl('',Validators.required),
      startDate: new FormControl('',Validators.required),
      endDate: new FormControl('',Validators.required),
      description:new FormControl('')
    });
    if (toPatchData) {
      // control.patchValue({language: toPatchData.language?.id, title:toPatchData.title,description: toPatchData.description});
      control.patchValue(toPatchData);
    }
    return control;
  }

  
  onAddClick(){
    this.experienceArray.push(this.preparedControl());
    this.downBtn.nativeElement.style.visibility="visible";
  }

  onScrollDown(){
    document.getElementById(`${this.experienceArray.length-1}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height 
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.downBtn.nativeElement.style.visibility="hidden";
    }
    else{
      this.downBtn.nativeElement.style.visibility="visible";
    }
}


  onSubmitForm(){
    console.log("submit")
    this.setLocalStorage('resume-experience-data',this.resumeReactiveForm.value.experience);
    this.resumeDataService.updateResumeExperienceDate(this.resumeReactiveForm.value.experience);
    this.router.navigate(['/resume-builder/education']);
  }

  
  onBack(){
    this.router.navigate(['/resume-builder/header']);
  }

  onDeleteExperience(index:any){
    if(index!=0){

      this.matRef=this._matDialog.open(MatConfirmationModalComponent,{
        width:'400px'
      })
      this.matRef.componentInstance.dialogTitle='Delete Experience';
      this.matRef.componentInstance.content=`Are you sure delete experience no ${index+1} ? `;
      this.matRef.componentInstance.btn1Content='Yes';
      this.matRef.componentInstance.btn2Content='No';
      this.matRef.afterClosed().subscribe((response:any)=>{
        if(response){
          // this.experienceArray.controls.splice(index,1);
          // this.experienceArray.value.splice(index,1);
          this.experienceArray.removeAt(index)
          this.resumeDataService.updateResumeExperienceDate(this.experienceArray.value);
          console.log("execute delete ",this.experienceArray)
        }
      })
    }
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

  onContinue(){
    this.setLocalStorage('resume-experience-data',this.resumeReactiveForm.value.experience);
    this.resumeDataService.updateResumeExperienceDate(this.resumeReactiveForm.value.experience);
    this.router.navigate(['/resume-builder/education']);
  }
}
