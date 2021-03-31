import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadImageRoutingModule } from './upload-image-routing.module';
import { UploadImageComponent } from './upload-image.component';
import { NgMultitaskFilesDirective } from './directives/ng-multitask-files.directive';


@NgModule({
  declarations: [UploadImageComponent, NgMultitaskFilesDirective],
  imports: [
    CommonModule,
    UploadImageRoutingModule
  ]
})
export class UploadImageModule { }
