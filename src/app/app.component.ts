import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../shared/pages/side-bar/side-bar.component';
import { ResumePreviewComponent } from './resume-viewer/resume-preview/resume-preview.component';
import { CustomResumePreviewModalComponent } from "./resume-viewer/custom-resume-preview-modal/custom-resume-preview-modal.component";
import { CustomResumeChangeTemplateModalComponent } from "./resume-viewer/custom-resume-change-template-modal/custom-resume-change-template-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, ResumePreviewComponent, CustomResumePreviewModalComponent, CustomResumeChangeTemplateModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resume-builder-demo';
}
