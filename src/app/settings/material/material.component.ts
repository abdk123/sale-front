import { Component, Injector, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CreateMaterialDialogComponent } from "./create-material/create-material-dialog.component";
import { EditMaterialDialogComponent } from "./edit-material/edit-material-dialog.component";
import { ViewMaterialDialogComponent } from "./view-material/view-material-dialog.component";
import {
  FilterDto,
  FullPagedRequestDto,
  MaterialDto,
  MaterialServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { FullPagedListingComponentBase } from "@shared/full-paged-listing-component-base";
import { FilterMaterialDialogComponent } from "./filter-material/filter-material-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "material",
  templateUrl: "./material.component.html",
})
export class MaterialComponent
  extends FullPagedListingComponentBase<MaterialDto>
  implements OnInit
{
  materials: MaterialDto[] = [];
  fields = [
    { label: this.l("Name"), name: "name", sortable: true, type: "string" },
    { label: this.l("TotalQuantity"), name: "totalQuantity", sortable: true, type: "number" },
    {
      label: this.l("Unit"),
      name: "unit",
      sortable: false,
      type: "reference",
      referenceTextField: "name",
    },
    {
      label: this.l("Category"),
      name: "category",
      sortable: false,
      type: "reference",
      referenceTextField: "name",
    },
    {
      label: this.l("Specification"),
      name: "specification",
      sortable: true,
      type: "string",
    },
  ];

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _materialService: MaterialServiceProxy,
    private _router: Router,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "category,unit,stocks";
    this._materialService.read(request).subscribe((result) => {
      
      this.materials = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    this._router.navigate(["/app/settings/create-material"]);
  }
  showEditModal(id: any) {
    this._router.navigate([
      "/app/settings/update-material",
      {
        id: id,
      },
    ]);
  }
  deleteItem(id: number): void {
    abp.message.confirm(
      this.l("MaterialDeleteWarningMessage", "Materials"),
      undefined,
      (result: boolean) => {
        if (result) {
          this._materialService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._router.navigate([
      "/app/settings/view-material",
      {
        id: id,
      },
    ]);
  }

  showFilterDialog(status) {
    if (status == "clear_filter") {
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(FilterMaterialDialogComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        filterInput: this.request.filtering,
      },
      class: "modal-lg",
    });
    filterDialog.content.onSave.subscribe((result: FilterDto) => {
      this.request.filtering = result;
      this._modalService.hide();
      this.refresh();
    });
  }
}
