import { Component, OnInit, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ADD_MORE_DETAILS_DATA, LANGUAGE_DATA, PROFICIENCY_DATA } from '../../../../shared/constants/constants';
import { MatIconModule } from '@angular/material/icon';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MatRadioModule} from '@angular/material/radio';
import { MatConfirmationModalComponent } from '../../../../shared/pages/mat-confirmation-modal/mat-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ResumeDataService } from '../../../../shared/services/resume-data.service';

@Component({
  selector: 'app-resume-additional-details-section-from',
  standalone: true,
  imports: [MatExpansionModule,MatCheckboxModule,MatInputModule,MatSelectModule,CKEditorModule,ReactiveFormsModule,MatIconModule,MatRadioModule],
  templateUrl: './resume-additional-details-section-from.component.html',
  styleUrl: './resume-additional-details-section-from.component.scss'
})
export class ResumeAdditionalDetailsSectionFromComponent implements OnInit{
  readonly panelOpenState = signal(false);

  resumeAddMoreReactiveForm:any;

  addMoreDetailsUiData=ADD_MORE_DETAILS_DATA;
  languageData=LANGUAGE_DATA;
  proficiencyData=PROFICIENCY_DATA;

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
  };
  matRef: any;

  constructor(private _matDialog:MatDialog,private router:Router,private resumeDataService:ResumeDataService){}


  ngOnInit(): void {
    this.resumeAddMoreReactiveForm=new FormGroup({
      activities:new FormControl(''),
      awards:new FormControl(''),
      certificate:new FormControl(''),
      languages:new FormArray([]),
      links:new FormArray([]),
      addMore:new FormArray([])
    });
    
    this.prepareFormFormAddMore();
    this.valueChangeOfAddMoreReactiveForm();
  }
  prepareFormFormAddMore(){
    let storeResumeAddMoreData=this.getLocalStorage('resume-add-more-data');

    if(storeResumeAddMoreData!== undefined && storeResumeAddMoreData){

      
      this.resumeAddMoreReactiveForm.patchValue(storeResumeAddMoreData);
      
      storeResumeAddMoreData.languages.forEach((language:any)=>{
        this.languagesArray.push(this.prepareControlLanguages(language));
      })
      storeResumeAddMoreData.links.forEach((link:any)=>{
        this.linksArray.push(this.prepareControlLinks(link));
      })
      storeResumeAddMoreData.addMore.forEach((addMore:any)=>{
        this.addMoreArray.push(this.prepareControlAddMore(addMore));
      })
      this.resumeDataService.updateResumeAddMoreDate(storeResumeAddMoreData);
    } 
    else{
      this.languagesArray.push(this.prepareControlLanguages());
      this.linksArray.push(this.prepareControlLinks());
      this.addMoreArray.push(this.prepareControlAddMore());
    }
  }

  valueChangeOfAddMoreReactiveForm(){
    
    this.resumeAddMoreReactiveForm.valueChanges.subscribe((resumeAddMoreData:any) => {
      if(resumeAddMoreData.languages){
        resumeAddMoreData.languages.forEach((element:any)=>{
        
          this.languageData.forEach((language:any)=>{
              if(language.id==element.language){
                element.language=language;
              }
            })
            
            this.proficiencyData.forEach((proficiency:any)=>{
              if(proficiency.id===element.proficiency){
                element.proficiency=proficiency;
              }
            })

          })
      }
      this.resumeDataService.updateResumeAddMoreDate(resumeAddMoreData);
    });

  }

  //get languageArray
  get languagesArray(): any {
    return this.resumeAddMoreReactiveForm.get('languages') as FormArray<any>;
  }
  //get linkArray
  get linksArray(): any {
    return this.resumeAddMoreReactiveForm.get('links') as FormArray<any>;
  }
  //get addMoreArray
  get addMoreArray(): any {
    return this.resumeAddMoreReactiveForm.get('addMore') as FormArray<any>;
  }

  //prepare Control for Languages
  prepareControlLanguages(toPatchData:any={}){
    const control=new FormGroup({
      language:new FormControl(''),
      proficiency:new FormControl('')
    });
    if(toPatchData){
      control.patchValue({language:toPatchData.language?.id,proficiency:toPatchData?.proficiency?.id});
    }
    return control;
  }

  onAddLanguageControl(){
    this.languagesArray.push(this.prepareControlLanguages());
  }
  onDeleteLanguageControl(index:any){
    if(index!=0){

      this.matRef=this._matDialog.open(MatConfirmationModalComponent,{
        width:'400px'
      })
      this.matRef.componentInstance.dialogTitle='Delete Language';
      this.matRef.componentInstance.content=`Are you sure delete language no ${index+1} ? `;
      this.matRef.componentInstance.btn1Content='Yes';
      this.matRef.componentInstance.btn2Content='No';
      this.matRef.afterClosed().subscribe((response:any)=>{
        if(response){
          this.languagesArray.removeAt(index)
          // this.languagesArray.controls.splice(index,1);
          // this.languagesArray.value.splice(index,1);
          // this.resumeDataService.updateResumeExperienceDate(this.educationArray.value);
        }
      })
    }
  }
  
  prepareControlLinks(toPatchData:any={}){
    const control=new FormGroup({
      link:new FormControl(''),
      addHeader:new FormControl(false)
    });
    if(toPatchData){
      control.patchValue(toPatchData);
    }
    return control;
  }

  onAddLinksControl(){
    this.linksArray.push(this.prepareControlLinks());
  }

  onDeleteLinkControl(index:any){
    if(index!=0){

      this.matRef=this._matDialog.open(MatConfirmationModalComponent,{
        width:'400px'
      })
      this.matRef.componentInstance.dialogTitle='Delete Link';
      this.matRef.componentInstance.content=`Are you sure delete link no ${index+1} ? `;
      this.matRef.componentInstance.btn1Content='Yes';
      this.matRef.componentInstance.btn2Content='No';
      this.matRef.afterClosed().subscribe((response:any)=>{
        if(response){
          this.linksArray.controls.splice(index,1);
          this.linksArray.value.splice(index,1);
          // this.resumeDataService.updateResumeExperienceDate(this.educationArray.value);
        }
      })
    }
  }
  prepareControlAddMore(toPatchData:any={}){
    const control=new FormGroup({
      sectionName:new FormControl(''),
      description:new FormControl(''),
    });
    if(toPatchData){
      control.patchValue(toPatchData);
    }
    return control;
  }
  onAddMoreControl(){
    this.addMoreArray.push(this.prepareControlAddMore());
  }

  onDeleteAddMoreControl(index:any){
    if(index!=0){

      this.matRef=this._matDialog.open(MatConfirmationModalComponent,{
        width:'400px'
      })
      this.matRef.componentInstance.dialogTitle='Delete Custom Section';
      this.matRef.componentInstance.content=`Are you sure delete custom section no ${index+1} ? `;
      this.matRef.componentInstance.btn1Content='Yes';
      this.matRef.componentInstance.btn2Content='No';
      this.matRef.afterClosed().subscribe((response:any)=>{
        if(response){
          this.addMoreArray.controls.splice(index,1);
          this.addMoreArray.value.splice(index,1);
          // this.resumeDataService.updateResumeExperienceDate(this.educationArray.value);
        }
      })
    }
  }

  onBack(){
    this.router.navigate(['/resume-builder/summary']);
  }

  onContinue(){
    this.resumeAddMoreReactiveForm.value.languages.forEach((element:any)=>{
      
      this.languageData.forEach((language:any)=>{
        if(language.id==element.language){
          element.language=language;
        }
      })

      
      this.proficiencyData.forEach((proficiency:any)=>{
        if(proficiency.id===element.proficiency){
          element.proficiency=proficiency;
        }
      })
      
    })

    this.setLocalStorage('resume-add-more-data',this.resumeAddMoreReactiveForm.value);
    this.router.navigate(['/resume-builder/download-resume']);
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
