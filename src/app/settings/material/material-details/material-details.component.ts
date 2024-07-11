import { Component, OnInit } from '@angular/core';
import { MaterialDetailDto, MaterialDto, MaterialServiceProxy, MaterialsOfSupplierDto } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'material-details',
  templateUrl: './material-details.component.html',

})
export class MaterialDetailsComponent implements OnInit {
  editable: true;
  isLoaded:boolean=false;
  id:number;
  ColumnMode = ColumnMode;
  data:MaterialDetailDto=new MaterialDetailDto();
  materialOfSuppliers: MaterialsOfSupplierDto[] = []
  dataToolTip: string = '';

  constructor(public bsModalRef: BsModalRef,
    private _materialService:MaterialServiceProxy){}

  ngOnInit(): void {
   this.getMaterialDetails();
   this.getMaterialsOfSuppliers();
  }

  getMaterialDetails()
  {
    this._materialService.getMaterialDetails(this.id).subscribe((result:MaterialDetailDto)=>{
      this.data=result;
      this.isLoaded=true;
    });
  }

  getMaterialsOfSuppliers(){
    this._materialService.getMaterialsOfSupplier(this.id)
    .subscribe((result)=>{
      this.materialOfSuppliers = result;
    });
  }

  onHover(supplierId){
    this.dataToolTip = '';
    const dataInfo = this.materialOfSuppliers.find(x=>x.supplierId == supplierId);
    if(dataInfo){
    dataInfo.materialNames.forEach((item)=>{
      if(this.dataToolTip.length != 0){
        this.dataToolTip += ' / ' + item.materialName + '  ' + item.leadTime + ' Days'
      }else{
        this.dataToolTip = item.materialName + '  ' + item.leadTime + ' Days'
      }
    });
    return this.dataToolTip;
  }else{
    return ''
  }

  }
}
