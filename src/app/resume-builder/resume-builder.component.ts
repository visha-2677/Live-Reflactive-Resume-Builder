import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../shared/pages/side-bar/side-bar.component';
import { ResumePreviewComponent } from '../resume-viewer/resume-preview/resume-preview.component';

@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent,ResumePreviewComponent],
  templateUrl: './resume-builder.component.html',
  styleUrl: './resume-builder.component.scss'
})
export class ResumeBuilderComponent {

}
