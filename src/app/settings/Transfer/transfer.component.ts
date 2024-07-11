import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateTransferDialogComponent } from './create-transfer/create-transfer-dialog.component';
import { EditTransferDialogComponent } from './edit-transfer/edit-transfer-dialog.component';
import { ViewTransferDialogComponent } from './view-transfer/view-transfer-dialog.component';
import { CreateTransferDto, FilterDto, FullPagedRequestDto, TransferDto, TransferServiceProxy } from '@shared/service-proxies/service-proxies';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterTransferDialogComponent } from './filter-transfer/filter-transfer-dialog.component';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
})
export class TransferComponent extends FullPagedListingComponentBase<TransferDto> implements OnInit {
  transfers: TransferDto[] = [];
  fields = [
    { label: this.l('To'), name: 'to', sortable: true, type: 'reference', referenceTextField: 'name'},
    { label: this.l('From'), name: 'from', sortable: true, type: 'reference', referenceTextField: 'name' },
    { label: this.l('Value'), name: 'value', sortable: true, type: 'number' },
  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _transferService: TransferServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.including = "From,To";
    this._transferService.read(request)
      .subscribe(result => {
        this.transfers = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  showAddNewModal() {
    let createTransferDialog: BsModalRef;
    createTransferDialog = this._modalService.show(
      CreateTransferDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
      }
    );
    createTransferDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any) {
    let editTransferDialog: BsModalRef;
    editTransferDialog = this._modalService.show(
      EditTransferDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState: {
          id: id
        }
      }
    );
    editTransferDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l('TransferDeleteWarningMessage', 'Transfers'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._transferService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(
      ViewTransferDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
      }
    );

  }

  showFilterDialog(status) {
    if (status == 'clear_filter') {
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(
      FilterTransferDialogComponent,
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




