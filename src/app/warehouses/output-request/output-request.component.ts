import { Component, Injector, OnInit } from '@angular/core';
import { FilterDto, FullPagedRequestDto, OutputRequestDto, OutputRequestServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ViewOutputRequestDialogComponent } from './view-output-request/view-output-request-dialog.component';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterOutputRequestDialogComponent } from './filter-outputRequest/filter-output-request-dialog.component';
import {  IEnumValue, IPageField } from '@app/layout/content-template/page-default/page-field';
@Component({
  selector: 'output-request',
  templateUrl: './output-request.component.html',
})
export class OutputRequestComponent extends FullPagedListingComponentBase<OutputRequestDto> {
  data: OutputRequestDto[] = [];
  status:IEnumValue[]=[
    {value:0,text:this.l("Pending")},
    {value:1,text:this.l("InProduction")},
    {value:2,text:this.l("Finished")},
  ];

  fields :IPageField[]= [
    { label: this.l('Title'), name: 'title', sortable: true, type: 'string' },
    { label: this.l('Plan'), type: 'reference',referenceTextField: 'title',name: 'plan', sortable: true },
    { label: this.l('Status'), name: 'status',  type: 'enum' , enumValue: this.status ,sortable: true },
    { label: this.l('OutputDate'), name: 'outputDate', sortable: true, type: 'date',format:"yyyy-MM-dd" }
  ];
  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _OutputRequestService: OutputRequestServiceProxy,
    private _router: Router,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }
  showViewModal(id: number) {
    this._modalService.show(
      ViewOutputRequestDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
      }
    );
  }
  showEditModal(id: number): void {
    this._router.navigate(['app/warehouses/editOutputRequest', id])
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.including="plan"
    this._OutputRequestService.read(request)
      .subscribe(result => {
        this.data = result.items;
        console.log(  this.data )
        this.showPaging(result, pageNumber);
      })


  }
  deleteItem(id: number): void {
    abp.message.confirm(
      this.l('WarehouseDeleteWarningMessage', 'Warehouses'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._OutputRequestService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );

  }
  showAddNewModal(): void {

    this._router.navigate(['app/warehouses/newOutputRequest']);
  }

  onchangeStatusToInProduction(id: number) {
    this._OutputRequestService.changeStatus(1, id).subscribe((result) => {
      this.notify.info(this.l('changeSuccessfully'));
      this.bsModalRef.hide();
      location.reload();
    })

  }

  onchangeStatusToFinish(id: number) {
    this._OutputRequestService.changeStatus(2, id).subscribe((result) => {
      this.notify.info(this.l('changeSuccessfully'));
      this.bsModalRef.hide();
      location.reload();

    })

  }


  showFilterDialog(status) {
    if (status == 'clear_filter') {
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(
      FilterOutputRequestDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          filterInput: this.request.filtering,
        },
        class: 'modal-lg',
      }
    );
    filterDialog.content.onSave.subscribe((result: FilterDto) => {
      this.request.filtering = result;
      this._modalService.hide();
      this.refresh();
    });
  }




}


