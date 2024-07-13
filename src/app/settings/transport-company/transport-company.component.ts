import { Component, Injector, OnInit } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { TransportCompanyDto, TransportCompanyServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateTransportCompanyComponent } from './create-transport-company/create-transport-company.component';
import { EditTransportCompanyComponent } from './edit-transport-company/edit-transport-company.component';
import { ViewTransportCompanyComponent } from './view-transport-company/view-transport-company.component';

@Component({
  selector: "transport-company",
  templateUrl: "./transport-company.component.html",
})
export class TransportCompanyComponent
  extends FullPagedListingComponentBase<TransportCompanyDto>
  implements OnInit
{
  categories: TransportCompanyDto[] = [];
  fields = [
    { label: this.l("Name"), name: "name", sortable: true, type: "string" },
    {
      label: this.l("PhoneNumber"),
      name: "phoneNumber",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("Address"),
      name: "address",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("BalanceInDollar"),
      name: "balanceInDollar",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("BalanceInDinar"),
      name: "balanceInDinar",
      sortable: true,
      type: "number",
    },
  ];
  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _transportCompanyService: TransportCompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "ParentTransportCompany";
    this._transportCompanyService.read(request).subscribe((result) => {
      this.categories = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    let createTransportCompanyDialog: BsModalRef;
    createTransportCompanyDialog = this._modalService.show(
      CreateTransportCompanyComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
      }
    );
    createTransportCompanyDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any) {
    let editTransportCompanyDialog: BsModalRef;
    editTransportCompanyDialog = this._modalService.show(
      EditTransportCompanyComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
        initialState: {
          id: id,
        },
      }
    );
    editTransportCompanyDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l("TransportCompanyDeleteWarningMessage", "Categories"),
      undefined,
      (result: boolean) => {
        if (result) {
          this._transportCompanyService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(ViewTransportCompanyComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        id: id,
      },
    });
  }

  showFilterDialog(status) {
    //   if (status == "clear_filter") {
    //     this.request.filtering = undefined;
    //     this.refresh();
    //     return;
    //   }
    //   let filterDialog: BsModalRef;
    //   filterDialog = this._modalService.show(FilterTransportCompanyComponent, {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       filterInput: this.request.filtering,
    //     },
    //     class: "modal-lg",
    //   });
    //   filterDialog.content.onSave.subscribe((result: FilterDto) => {
    //     this.request.filtering = result;
    //     this._modalService.hide();
    //     this.refresh();
    //   });
  }
}
