import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'resume-builder',
        pathMatch: 'full',
      },
      {
        path: 'resume-builder',
        loadChildren: () => import('./resume-builder/resume-builder.routes').then((m) => m.routes),
      },
      {
        path:'resume-view',
        loadComponent:()=>import('./resume-viewer/resume-view-two/resume-view-two.component').then((m)=>m.ResumeViewTwoComponent)
      },
      {
        path: '**',
        redirectTo: 'error',
        pathMatch: 'full',
      },
      {
        path: 'error',
        loadComponent: () =>
          import('../shared/pages/error/error.component').then(
            (m) => m.ErrorComponent
          ),
      },
];
