import { Component, OnInit } from "@angular/core";
import {
  MaterialDto,
  MaterialServiceProxy,
  CustomerDto,
  CustomerServiceProxy,
  CategoryDto,
  CategoryServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "view-material-dialog",
  templateUrl: "./view-material-dialog.component.html",
})
export class ViewMaterialDialogComponent implements OnInit {
  data = new MaterialDto();
  category = new CategoryDto();
  id: number;
  editable: true;
  constructor(
    public bsModalRef: BsModalRef,
    private _materialService: MaterialServiceProxy,
    private _categoryService: CategoryServiceProxy
  ) {}
  ngOnInit(): void {
    this.initMaterial();
  }

  initMaterial() {
    this._materialService.get(this.id).subscribe((response) => {
      this.data = response;
      this.initialCategory(this.data.categoryId);
    });
  }

  initialCategory(categoryId: number) {
    this._categoryService.get(categoryId).subscribe((result) => {
      this.category = result;
    });
  }
}
