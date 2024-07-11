import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { OutputRequestServiceProxy, OutputRequestWithDetailDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'actual-detail-dialog',
  templateUrl: './actual-detail-dialog.component.html',
  styleUrls: ['./actual-detail-dialog.component.scss']
})
export class ActualDetailDialogComponent extends AppComponentBase implements OnInit {
  planId: number;
  outputRequests: OutputRequestWithDetailDto[] = [];
  constructor(
    injector: Injector,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _outputRequestService: OutputRequestServiceProxy,
    public bsModalRef:BsModalRef,
    ){
    super(injector);
  }
  ngOnInit(): void {
    this.initialOutputRequestDetail();
  }

  initialOutputRequestDetail(){
    this._outputRequestService.getWithDetail(this.planId)
    .subscribe((result: OutputRequestWithDetailDto[])=>{
      this.outputRequests = result;
    });
  }

}
