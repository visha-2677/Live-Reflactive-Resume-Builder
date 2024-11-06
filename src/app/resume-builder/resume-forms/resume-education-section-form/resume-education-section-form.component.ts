import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ResumeDataService } from '../../../../shared/services/resume-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmationModalComponent } from '../../../../shared/pages/mat-confirmation-modal/mat-confirmation-modal.component';
import { DEGREE_DATA, MONTH_DATA } from '../../../../shared/constants/constants';
import { JsonPipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-resume-education-section-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatSelectModule,RouterModule,MatDatepickerModule,CKEditorModule,JsonPipe,MatIconModule],
  templateUrl: './resume-education-section-form.component.html',
  styleUrl: './resume-education-section-form.component.scss'
})
export class ResumeEducationSectionFormComponent implements OnInit, AfterViewInit {

  resumeEducationData= [];
  resumeReactiveForm:any;
  degreeData=DEGREE_DATA;
  yearData:Array<number>=[];
  monthData=MONTH_DATA;
  public Editor = ClassicEditor;
  public resumeExpDescriptionData = '<ul> <li> Write Your Experience! </li><li> To Achive Something! </li><li> Type something here! </li> </ul> ';
  storeResumeExperienceData:any;

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
  @ViewChild('downBtn') downBtn!:ElementRef;


  constructor(private router:Router,private resumeDataService:ResumeDataService,public _matDialog: MatDialog){}

  ngOnInit(): void {
    this.resumeReactiveForm=new FormGroup({
      education:new FormArray([])
    })
    for(let i=2034;i>=1959;i--){
      this.yearData.push(i);
    }
    
    let storeResumeEducationData=this.getLocalStorage('resume-education-data');

    if(storeResumeEducationData!== undefined && storeResumeEducationData && storeResumeEducationData.length>=1){
      this.resumeEducationData=storeResumeEducationData;
      this.resumeDataService.updateResumeEducationData(this.resumeEducationData);
      this.resumeEducationData.forEach((element:any)=>{
        this.educationArray.push(this.preparedControl(element));
      })
    } 
    else{
      this.educationArray.push(this.preparedControl());
    }

    this.resumeReactiveForm.get('education')?.valueChanges.subscribe((education:any) => {
      education.forEach((element:any)=>{
        
        this.monthData.forEach((month:any)=>{
          if(month.id==element.month){
            element.month=month;
          }
        })

        this.degreeData.forEach((degree:any)=>{
          if(degree.id === element.degree){
            element.degree=degree;
          }
        })
      })

      console.log("education ",education)
      
      this.resumeDataService.updateResumeEducationData(education);
    });
  }
  ngAfterViewInit(): void {
    
    if(this.educationArray.length >1){
      this.downBtn.nativeElement.style.visibility="visible";
    }
  }

  //get gpArray
  get educationArray(): any {
    return this.resumeReactiveForm.get('education') as FormArray<any>;
  }

  /**
   * prepared controls
   * @returns
   */
  preparedControl(toPatchData: any = {}) {
    const control = new FormGroup({
      schoolName: new FormControl('',Validators.required),
      schoolLocation: new FormControl('',Validators.required),
      degree: new FormControl('',Validators.required),
      enteredDegree :new FormControl(''),
      study: new FormControl('',Validators.required),
      month: new FormControl('',Validators.required),
      year:new FormControl('',Validators.required),
      description:new FormControl('')
    });
    if (toPatchData) {
      // control.patchValue({language: toPatchData.language?.id, title:toPatchData.title,description: toPatchData.description});
      control.patchValue({...toPatchData,month:toPatchData?.month?.id,degree:toPatchData?.degree?.id});
    }
    return control;
  }

  
  onAddClick(){
    this.educationArray.push(this.preparedControl());
  }

  onScrollDown(){
    document.getElementById(`${this.educationArray.length-1}`)?.scrollIntoView({
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
    console.log(',this.resumeReactiveForm.value.education ==========>',this.resumeReactiveForm.value.education)
    this.setLocalStorage('resume-education-data',this.resumeReactiveForm.value.education);
    this.resumeDataService.updateResumeEducationData(this.resumeReactiveForm.value.education);
    this.router.navigate(['/resume-builder/skills']);
  }

  
  onBack(){
    this.router.navigate(['/resume-builder/experience']);
  }

  onDeleteEduction(index:any){
    if(index!=0){

      this.matRef=this._matDialog.open(MatConfirmationModalComponent,{
        width:'400px'
      })
      this.matRef.componentInstance.dialogTitle='Delete Education';
      this.matRef.componentInstance.content=`Are you sure delete education no ${index+1} ? `;
      this.matRef.componentInstance.btn1Content='Yes';
      this.matRef.componentInstance.btn2Content='No';
      this.matRef.afterClosed().subscribe((response:any)=>{
        if(response){
          this.educationArray.removeAt(index)
          // this.educationArray.controls.splice(index,1);
          // this.educationArray.value.splice(index,1);
          console.log("education Array ",this.educationArray.value)
          this.resumeDataService.updateResumeExperienceDate(this.educationArray.value);
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

    this.resumeReactiveForm.value.education.forEach((education:any)=>{
      
      this.monthData.forEach((month:any)=>{
        if(month.id==education.month){
          education.month=month;
        }
      })

      this.degreeData.forEach((degree:any)=>{
        if(degree.id === education.degree){
          education.degree=degree;
        }
      })
    })
    console.log("this.resumeEducationData Continue ",this.resumeReactiveForm.value.education);
    this.setLocalStorage('resume-education-data',this.resumeReactiveForm.value.education);
    this.resumeDataService.updateResumeExperienceDate(this.resumeReactiveForm.value.education);
    this.router.navigate(['/resume-builder/skills']);

  }
}
