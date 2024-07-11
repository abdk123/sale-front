import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'test-report',
  templateUrl: './test-report.component.html',
  
})
export class TestReportComponent  extends AppComponentBase {

  constructor(
    injector: Injector,
    public bsModalRef:BsModalRef,
    ){
    super(injector);
  }
  
  reportServer: string = 'http://localhost/ReportServer';
  reportUrl: string = 'test/employee';
  language: string = "en-us";
  width: number = 100;
  height: number = 100;
  toolbar: string = "true";




}
