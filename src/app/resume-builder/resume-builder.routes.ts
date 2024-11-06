import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./resume-builder.component').then((m) => m.ResumeBuilderComponent),
        children: [
            {
                path:'',
                redirectTo:'header',
                pathMatch:'full'
            },
            {
                path:'header',
                loadComponent:()=>import('./resume-forms/resume-header-section-form/resume-header-section-form.component').then((m)=> m.ResumeHeaderSectionFormComponent)
            },
            {
                path:'experience',
                loadComponent:()=>import('./resume-forms/resume-experience-section-form/resume-experience-section-form.component').then((m)=>m.ResumeExperienceSectionFormComponent)
            },
            {
                path:'education',
                loadComponent:()=>import('./resume-forms/resume-education-section-form/resume-education-section-form.component').then((m)=>m.ResumeEducationSectionFormComponent)
            },
            {
                path:'skills',
                loadComponent:()=>import('./resume-forms/resume-skills-section-form/resume-skills-section-form.component').then((m)=>m.ResumeSkillsSectionFormComponent)
            },
            {
                path:'summary',
                loadComponent:()=>import('./resume-forms/resume-summary-section-from/resume-summary-section-from.component').then((m)=>m.ResumeSummarySectionFromComponent)
            },
            {
                path:'additional-details',
                loadComponent:()=>import('./resume-forms/resume-additional-details-section-from/resume-additional-details-section-from.component').then((m)=>m.ResumeAdditionalDetailsSectionFromComponent)
            },
            {
                path:'download-resume',
                loadComponent:()=>import('./final-resume-download/final-resume-download.component').then((m)=>m.FinalResumeDownloadComponent),
            }
        ]
    }
    
];
