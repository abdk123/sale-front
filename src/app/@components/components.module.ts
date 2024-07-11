import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from './carousel/carousel.module';
import { ChartsModule } from './charts/charts.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule,
    ChartsModule,
  ],
  exports: [
  ],
  providers:[

  ]
})
export class ComponentsModule { }
