import { Component, Injector, OnInit } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { ClearanceCompanyDto, ClearanceCompanyServiceProxy, FullPagedRequestDto, FilterDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditClearanceCompanyComponent } from './edit-clearance-company/edit-clearance-company.component';
import { CreateClearanceCompanyComponent } from './create-clearance-company/create-clearance-company.component';
import { ViewClearanceCompanyComponent } from './view-clearance-company/view-clearance-company.component';

@Component({
  selector: "clearance-company",
  templateUrl: "./clearance-company.component.html",
})
export class ClearanceCompanyComponent
  extends FullPagedListingComponentBase<ClearanceCompanyDto>
  implements OnInit
{
  categories: ClearanceCompanyDto[] = [];
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
    private _clearanceCompanyService: ClearanceCompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "ParentClearanceCompany";
    this._clearanceCompanyService.read(request).subscribe((result) => {
      this.categories = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    let createClearanceCompanyDialog: BsModalRef;
    createClearanceCompanyDialog = this._modalService.show(
      CreateClearanceCompanyComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
      }
    );
    createClearanceCompanyDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any) {
    let editClearanceCompanyDialog: BsModalRef;
    editClearanceCompanyDialog = this._modalService.show(
      EditClearanceCompanyComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
        initialState: {
          id: id,
        },
      }
    );
    editClearanceCompanyDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l("ClearanceCompanyDeleteWarningMessage", "Categories"),
      undefined,
      (result: boolean) => {
        if (result) {
          this._clearanceCompanyService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(ViewClearanceCompanyComponent, {
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
    //   filterDialog = this._modalService.show(FilterClearanceCompanyComponent, {
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
