import { Component, Injector, OnInit } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterDto, FullPagedRequestDto, StoreDto, StoreServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateStoreComponent } from './create-store/create-store.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { ViewStoreComponent } from './view-store/view-store.component';

@Component({
  selector: "store",
  templateUrl: "./store.component.html",
})
export class StoreComponent
  extends FullPagedListingComponentBase<StoreDto>
  implements OnInit
{
  stores: StoreDto[] = [];
  fields = [
    { label: this.l("Name"), name: "name", sortable: true, type: "string" },
    { label: this.l("Address"), name: "address", sortable: true, type: "string" },
    {
      label: this.l("Description"),
      name: "description",
      sortable: true,
      type: "string",
    },
  ];
  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _storeService: StoreServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
    debugger;
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "ParentStore";
    this._storeService.read(request).subscribe((result) => {
      this.stores = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    let createStoreDialog: BsModalRef;
    createStoreDialog = this._modalService.show(CreateStoreComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
    createStoreDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any) {
    let editStoreDialog: BsModalRef;
    editStoreDialog = this._modalService.show(EditStoreComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
      initialState: {
        id: id,
      },
    });
    editStoreDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l("StoreDeleteWarningMessage", "Categories"),
      undefined,
      (result: boolean) => {
        if (result) {
          this._storeService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(ViewStoreComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        id: id,
      },
    });
  }

  showFilterDialog(status) {
    // if (status == "clear_filter") {
    //   this.request.filtering = undefined;
    //   this.refresh();
    //   return;
    // }
    // let filterDialog: BsModalRef;
    // filterDialog = this._modalService.show(FilterStoreDialogComponent, {
    //   backdrop: true,
    //   ignoreBackdropClick: true,
    //   initialState: {
    //     filterInput: this.request.filtering,
    //   },
    //   class: "modal-lg",
    // });
    // filterDialog.content.onSave.subscribe((result: FilterDto) => {
    //   this.request.filtering = result;
    //   this._modalService.hide();
    //   this.refresh();
    // });
  }
}
