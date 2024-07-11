import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlideComponent } from './glide/glide.component';



@NgModule({
  declarations: [
    GlideComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GlideComponent
  ]
})
export class CarouselModule { }
