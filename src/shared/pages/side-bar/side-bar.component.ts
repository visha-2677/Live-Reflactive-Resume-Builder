import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  steps = [
    { id: 1, path: '/resume-builder/header' },
    { id: 2, path: '/resume-builder/experience' },
    { id: 3, path: '/resume-builder/education' },
    { id: 4, path: '/resume-builder/skills' },
    { id: 5, path: '/resume-builder/summary' },
    { id: 6, path: '/resume-builder/additional-details' },
    { id: 7, path: '/resume-builder/download-resume' }
  ];
}
