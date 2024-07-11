import { Component, OnInit } from '@angular/core';
import { CategoryDto, CategoryServiceProxy, } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'view-category-dialog',
  templateUrl: './view-category-dialog.component.html',

})
export class ViewCategoryDialogComponent implements OnInit {
  category=new CategoryDto();
  id:number;
  editable:true;
  constructor(  private _categoryService: CategoryServiceProxy,
    public bsModalRef: BsModalRef,
    ) { }

  ngOnInit(): void {
   this.initCategory(this.id);
  }
  

  initCategory(id:number){
    this._categoryService.get(id).subscribe((result)=>{
      this.category=result;
    });

  }
}
