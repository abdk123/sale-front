import { WorkFlowComponent } from './work-flow.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepsComponent } from './steps/steps.component';


const routes: Routes = [{
  path: 'workflow', component:WorkFlowComponent,

},
{
  path: 'steps/:id',
  component: StepsComponent,
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkFlowRoutingModule { }
